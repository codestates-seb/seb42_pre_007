package com.pre007.server.answer.service;

import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.entity.AnswerVote;
import com.pre007.server.answer.repository.AnswerRepository;
import com.pre007.server.answer.repository.AnswerVoteRepository;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.service.FindQuestionService;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.service.FindUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

// AnswerRepository에 대한 데이터 액세스 로직을 제공
@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final FindUserService findUserService;
    private final FindQuestionService findQuestionService;
    private final FindAnswerService findAnswerService;
    private final AnswerVoteRepository answerVoteRepository;

    public void createAnswer(AnswerCreateDto requestDto, Long questionId){
        Question question = findQuestionService.id(questionId);
        User user = findUserService.displayName(requestDto.getUser());
        Answer answer = new Answer();
        answer.setUser(user);
        answer.setContent(requestDto.getContent());
        answer.setQuestion(question);
        answerRepository.save(answer);
    }

    public void updateAnswer(Long id, AnswerUpdateDto requestDto, String email){

        Answer answer = findAnswerService.id(id);
        findUserService.isPermission(answer.getUser(), email);
        answer.setContent(requestDto.getContent());
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long id, String email){
        Answer answer = findAnswerService.id(id);
        findUserService.isPermission(answer.getUser(), email);
        answerRepository.deleteById(id);
    }

    /**
     * votes
     */

    public void addVote(Long id, String email, Integer vote) {
        User user = findUserService.email(email);
        Answer answer = findAnswerService.id(id);

        verifyExistsVote(user, answer);

        answer.setVotes(answer.getVotes() + vote);

        answerVoteRepository.save(new AnswerVote(user, answer, vote));
    }

    private void verifyExistsVote(User user, Answer answer) {
        Optional<AnswerVote> vote = answerVoteRepository.findByUserAndQuestion(user, answer);
        if (vote.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
    }

    public void selectionAnswer(Long questionId, String email, Long id) {
        Question question = findQuestionService.id(questionId);
        findUserService.isPermission(question.getUser(), email);

        Answer answer = findAnswerService.id(id);
        answer.setSelection(true);
        answerRepository.save(answer);
    }
}
