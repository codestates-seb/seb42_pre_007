package com.pre007.server.answer.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerDto {
    private Long answerId;
    private Long userId;
    private Long questionId;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime modified;

    public static class Post{
        @NotBlank(message = "Content is missing.")
        private String content;
    }

    public static class Patch{
        private Long answerId;
        @NotBlank(message = "Content is missing")
        private String content;
        public void setAnswerId(Long answerId){this.answerId = answerId;}
    }


}
