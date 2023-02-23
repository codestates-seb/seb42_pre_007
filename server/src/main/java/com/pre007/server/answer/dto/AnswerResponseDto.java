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
    private String user;
    private Long answerId;
    private String content;
    private LocalDateTime createAt;
    private Integer votes = 0;

    public AnswerResponseDto(Answer entity){
        this.user = entity.getUser().getDisplayName();
        this.answerId = entity.getAnswerId();
        this.content = entity.getContent();
        this.createAt = entity.getCreatedAt();
//        this.votes = entity
    }
}
