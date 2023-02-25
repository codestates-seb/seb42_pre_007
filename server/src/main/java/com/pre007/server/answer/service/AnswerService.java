package com.pre007.server.answer.service;

import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.repository.AnswerRepository;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

// AnswerRepository에 대한 데이터 액세스 로직을 제공
@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public void createAnswer(AnswerCreateDto requestDto, Long questionId){
        Question question = questionRepository.findById(questionId).get();
        User user = userRepository.findByDisplayName(requestDto.getUser()).get();
        Answer answer = new Answer();
        answer.setUser(user);
        answer.setContent(requestDto.getContent());
        answerRepository.save(answer);
    }

    public void updateAnswer(Long id, AnswerUpdateDto requestDto){
        // Answer answer = getAnswerById(id);
        Answer answer = answerRepository.findById(id).get();
        answer.setContent(requestDto.getContent());
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long id){
        answerRepository.deleteById(id);
    }
}
