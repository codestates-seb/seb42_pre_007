package com.pre007.server.answer.dto;

import com.pre007.server.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDto {
    private Long answerId;
    private Long userId;
    private Long questionId;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime modified;

    public AnswerResponseDto(Answer entity){
        this.answerId = entity.getAnswerId();
        this.userId = entity.getUser().getUserId();
        this.questionId = entity.getQuestion().getQuestionId();
        this.content = entity.getContent();
        this.createAt = entity.getCreatedAt();
        this.modified = entity.getModified();

    }
}
