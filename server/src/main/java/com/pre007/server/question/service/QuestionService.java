package com.pre007.server.question.service;

import com.pre007.server.answer.entity.Answer;
import com.pre007.server.question.dto.QuestionPatchDto;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.dto.QuestionResponseDto;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.user.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // 전체 조회
    public List<QuestionResponseDto> getAllQuestions(){
        List<Question> questions = questionRepository.findAll();

        return questions.stream()
                .map(question -> {
                    QuestionResponseDto dto = new QuestionResponseDto();
                    dto.setQuestionId(question.getQuestionId());
                    dto.setTitle(question.getTitle());
                    dto.setContent(question.getContent());
                    dto.setView(question.getView());
                    dto.setUser(UserResponseDto.fromEntity(question.getUser()));
                    List<Long> answerIds = question.getAnswers().stream()
                            .map(Answer::getAnswerId)
                            .collect(Collectors.toList());
                    dto.setAnswerIds((answerIds));
                    dto.setCreatedAt(question.getCreatedAt());
                    dto.setModified(question.getModified());

                    return dto;
        }).collect(Collectors.toList());
    }

    // 단일 조회
    public QuestionResponseDto getQuestion(Long id){
        Question getQuestion = questionRepository.findById(id).get();

        QuestionResponseDto dto = new QuestionResponseDto();

        dto.setQuestionId(getQuestion.getQuestionId());
        dto.setTitle(getQuestion.getTitle());
        dto.setContent(getQuestion.getContent());
        dto.setView(getQuestion.getView());
        dto.setUser(UserResponseDto.fromEntity(getQuestion.getUser()));
        List<Long> answerIds = getQuestion.getAnswers().stream()
                                .map(Answer::getAnswerId)
                                .collect(Collectors.toList());
        dto.setAnswerIds((answerIds));
        dto.setCreatedAt(getQuestion.getCreatedAt());
        dto.setModified(getQuestion.getModified());

        return dto;
    }

    // 생성
    public Long createQuestion(QuestionPostDto dto){
        Question question = new Question();
        question.setQuestionId(dto.getQuestionId());
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());

        return questionRepository.save(question).getQuestionId();
    }

    // 수정
    public QuestionPatchDto updateQuestion(QuestionPatchDto dto) {

        Question question = questionRepository.findById(dto.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + dto.getQuestionId()));

        if (dto.getTitle() != null) {
            question.setTitle(dto.getTitle());
        }

        if (dto.getContent() != null) {
            question.setContent(dto.getContent());
        }

//        if (dto.getTags() != null) {
//            question.setTags(dto.getTags());
//        }

        QuestionPatchDto dto2 = new QuestionPatchDto();
        dto2.setQuestionId(question.getQuestionId());
        dto2.setTitle(question.getTitle());
        dto2.setContent(question.getContent());
//        dto2.setTags(question.getTags());

        return dto2;
    }

    // 삭제
    public void deleteQuestion(Long id){
        questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
        questionRepository.deleteById(id);
    }
}
