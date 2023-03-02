package com.pre007.server.question.service;

import com.pre007.server.answer.dto.AnswerResponseDto;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.globaldto.PageableInfo;
import com.pre007.server.globaldto.PageableResponseDto;
import com.pre007.server.question.dto.*;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.entity.QuestionVote;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.question.repository.QuestionVoteRepository;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.service.FindUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final FindQuestionService findQuestionService;
    private final FindUserService findUserService;
    private final QuestionVoteRepository questionVoteRepository;
//    private final QuestionTagRepository questionTagRepository;

    private List<String> tagList = List.of("zero"); // 임시방편

    // 페이지별 조회
    public PageableResponseDto getQuestionsByQuestionPage(QuestionSearch questionSearch){
        List<QuestionResponseSimple> questions = questionRepository.getQuestionsByQuestionPage(questionSearch);
        //PageableInfo pageableInfo = questionRepository.getQuestionsCount().get(0);
        PageableInfo pageableInfo = new PageableInfo();
        pageableInfo.setTotalCount(questionRepository.count());
        pageableInfo.editByQuestionSearch(questionSearch);
        pageableInfo.setResultCount(questions.size());

        return new PageableResponseDto(questions.stream().map(QuestionResponseSimple::toDto), 200, pageableInfo);
    }

    // 단일 조회
    /**
     * fetch join 으로 성능개선의 여지가 있음
     */
    public QuestionResponseDto getQuestion(Long id){
        Question getQuestion = findQuestionService.id(id);
        getQuestion.setView(getQuestion.getView() + 1);

        QuestionResponseDto dto = new QuestionResponseDto();

        dto.setQuestionId(getQuestion.getQuestionId());
        dto.setTitle(getQuestion.getTitle());
        dto.setContent(getQuestion.getContent());
        dto.setUser(getQuestion.getUser().getDisplayName());
        dto.setCreatedAt(getQuestion.getCreatedAt());
        dto.setVotes(getQuestion.getVotes());
        dto.setView(getQuestion.getView());

        dto.setAnswers(getQuestion.getAnswers().stream()
                .map(AnswerResponseDto::createByEntity)
                .collect(Collectors.toList()));

        dto.setTags(Arrays.asList(getQuestion.getTags().split(" ")));

        return dto;
    }

    // 생성
    public Long createQuestion(QuestionPostDto dto){
        Question question = new Question();
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
        question.setUser(findUserService.displayName(dto.getUser()));
        question.setTags(Arrays.toString(dto.getTags())
                .replaceAll("\\[", "")
                .replaceAll("\\]", "")
                .replaceAll(",", ""));

        // 폐기
//        List<QuestionTag> incompleteTags = Arrays.stream(dto.getTag())
//                .map(s -> {
//                    if (tagList.contains(s)) {
//                        return tagList.indexOf(s);
//                    }
//                    tagList.add(s);
//                    return tagList.size() - 1;
//                })
//                .map(i -> new QuestionTag(i))
//                .collect(Collectors.toList());
//        List<QuestionTag> tags = question.setTags(incompleteTags);

        return questionRepository.save(question).getQuestionId();
    }

    // 수정
    public void updateQuestion(QuestionPatchDto dto, Long id, String email) {

        Question question = findQuestionService.id(id);
        findUserService.isPermission(question.getUser(), email);
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
    }

    // 삭제
    public void deleteQuestion(Long id, String email){
        Question question = findQuestionService.id(id);
        findUserService.isPermission(question.getUser(), email);
        questionRepository.deleteById(id);
    }

    /**
     * votes
     */
    public void addVote(Long id, String email, Integer vote) {
        User user = findUserService.email(email);
        Question question = findQuestionService.id(id);

        verifyExistsVote(user, question);

        question.setVotes(question.getVotes() + vote);

        questionVoteRepository.save(new QuestionVote(user, question, vote));
    }

    private void verifyExistsVote(User user, Question question) {
        Optional<QuestionVote> vote = questionVoteRepository.findByUserAndQuestion(user, question);
        if (vote.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
    }
}
