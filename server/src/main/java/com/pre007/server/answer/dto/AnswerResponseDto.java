package com.pre007.server.answer.dto;

import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.entity.AnswerVote;
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

    public static AnswerResponseDto createByEntity(Answer entity){
        AnswerResponseDto dto = new AnswerResponseDto();
        dto.setUser(entity.getUser().getDisplayName());
        dto.setAnswerId(entity.getAnswerId());
        dto.setContent(entity.getContent());
        dto.setCreateAt(entity.getCreatedAt());
        dto.setSelection(entity.getSelection());
        dto.setVotes(entity.getVotes().size() == 0 ? 0 :
                entity.getVotes().stream()
                        .mapToInt(AnswerVote::getVoteR)
                        .sum());

        return dto;
    }
}
