package com.pre007.server.question.dto;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class QuestionResponseSimple {

    private Long questionId;
    private String title;
    private String content;
    private String user;
    private LocalDateTime createdAt;
    private Integer votes = 0;
    private Integer view = 0;
    private Long answers = 0L;
}
