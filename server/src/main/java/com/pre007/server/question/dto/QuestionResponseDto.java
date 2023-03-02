package com.pre007.server.question.dto;

import com.pre007.server.answer.dto.AnswerResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {

    private Long questionId;

    private String title;

    private String content;

    private String user;

    private LocalDateTime createdAt;

    private Integer votes = 0;

    private Integer view = 0;

    private List<AnswerResponseDto> answers;

    private List<String> tags;
}
