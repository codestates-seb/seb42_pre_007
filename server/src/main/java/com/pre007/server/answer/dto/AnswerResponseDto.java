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
    private String content;
    private String user;
    private LocalDateTime createAt;
    private Integer votes = 0;
    private Boolean selection = false;
//
//    public AnswerResponseDto(Answer entity){
//        this.user = entity.getUser().getDisplayName();
//        this.answerId = entity.getAnswerId();
//        this.content = entity.getContent();
//        this.createAt = entity.getCreatedAt();
////        this.votes = entity
//    }
    public static AnswerResponseDto createByEntity(Answer entity){
        AnswerResponseDto dto = new AnswerResponseDto();
        dto.setUser(entity.getUser().getDisplayName());
        dto.setAnswerId(entity.getAnswerId());
        dto.setContent(entity.getContent());
        dto.setCreateAt(entity.getCreatedAt());
        dto.setVotes(entity.getVotes());
        dto.setSelection(entity.getSelection());

        return dto;
    }
}
