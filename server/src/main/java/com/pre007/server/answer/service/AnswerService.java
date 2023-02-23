package com.pre007.server.answer.service;

import com.pre007.server.answer.dto.AnswerResponseDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.repository.AnswerRepository;
import com.pre007.server.question.entity.Question;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
// AnswerRepository에 대한 데이터 액세스 로직을 제공
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }

    @Transactional
    public Answer saveAnswer(Answer answer){
        return answerRepository.save(answer);
    }
    private Answer getAnswerById(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("Answer not found for id: "+id));
    }

    public List<Answer> getAnswerByQuestionId(Long questionId){
        return answerRepository.findByQuestionId(questionId);
    }


    public List<AnswerResponseDto> findAnswerByQuestionId(Long questionId){
        List<Answer> answers = answerRepository.findByQuestionId(questionId);
        return answers.stream()
                .map(AnswerResponseDto::new)
                .collect(Collectors.toList());
    }
    public Answer createAnswer(@NotNull String requestDto){
        Question question = new Question();
        question.setQuestionId(requestDto.getQuestionId());
        Answer answer = new Answer();
        answer.setContent(requestDto.getContent());
        answer.setAnswerId(requestDto.getAnswerId());
        return answerRepository.save(answer);
    }

    @Transactional
    public Answer updateAnswer(Long id, AnswerUpdateDto requestDto){
        Answer answer = getAnswerById(id);
        return answer;
    }

    @Transactional
    public void deleteAnswer(Long id){
        answerRepository.deleteById(id);
    }
}
