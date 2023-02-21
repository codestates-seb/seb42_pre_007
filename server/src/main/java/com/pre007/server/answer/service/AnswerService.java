package com.pre007.server.answer.service;

import com.pre007.server.answer.dto.AnswerResponseDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }

    public List<AnswerResponseDto> findAnswerByQuestionId(Long questionId){
        List<Answer> answers = answerRepository.findByQuestionId(questionId);
        return answers.stream()
                .map(AnswerResponseDto::new)
                .collect(Collectors.toList());
    }
}
