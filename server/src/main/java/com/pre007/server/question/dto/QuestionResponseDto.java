package com.pre007.server.question.dto;

import com.pre007.server.user.dto.UserResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {

    private Long questionId;

    private String title;

    private String content;

    private Integer view;

    private UserResponseDto user;

    private List<Long> answerIds;

    private LocalDateTime createdAt;

    private LocalDateTime modified;
}
