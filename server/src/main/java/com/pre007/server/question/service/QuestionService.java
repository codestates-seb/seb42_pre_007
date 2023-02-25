package com.pre007.server.question.service;

import com.pre007.server.answer.dto.AnswerResponseDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.question.dto.*;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.user.service.FindUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final FindQuestionService findQuestionService;
    private final FindUserService findUserService;

    // 페이지별 조회
    public List<QuestionResponseSimple> getQuestionsByQuestionPage(QuestionPage questionPage){
        List<QuestionResponseSimple> questionsByQuestionPage = questionRepository.getQuestionsByQuestionPage(questionPage);
        return questionsByQuestionPage;
    }

    // 단일 조회
    public QuestionResponseDto getQuestion(Long id){
        Question getQuestion = findQuestionService.id(id);

        QuestionResponseDto dto = new QuestionResponseDto();

        dto.setQuestionId(getQuestion.getQuestionId());
        dto.setTitle(getQuestion.getTitle());
        dto.setContent(getQuestion.getContent());
        dto.setView(getQuestion.getView());
        dto.setUser(getQuestion.getUser().getDisplayName());
        dto.setAnswers(getQuestion.getAnswers().stream()
                .map(AnswerResponseDto::createByEntity)
                .collect(Collectors.toList()));
        dto.setCreatedAt(getQuestion.getCreatedAt());

        return dto;
    }

    // 생성
    public Long createQuestion(QuestionPostDto dto){
        Question question = new Question();
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
        question.setUser(findUserService.displayName(dto.getUser()));

        return questionRepository.save(question).getQuestionId();
    }

    // 수정
    public void updateQuestion(QuestionPatchDto dto, Long id) {

        Question question = findQuestionService.id(id);

        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
    }

    // 삭제
    public void deleteQuestion(Long id){
        questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
        questionRepository.deleteById(id);
    }
}
