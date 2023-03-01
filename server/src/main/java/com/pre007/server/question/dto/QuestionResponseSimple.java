package com.pre007.server.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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
    private String tags;

    public QuestionResponseSimpleDto toDto() {
        return new QuestionResponseSimpleDto(this);
    }

    @Data
    public class QuestionResponseSimpleDto {
        private Long questionId;
        private String title;
        private String content;
        private String user;
        private LocalDateTime createdAt;
        private Integer votes = 0;
        private Integer view = 0;
        private Long answers = 0L;
        private String[] tags;

        public QuestionResponseSimpleDto(QuestionResponseSimple simple) {
            this.questionId = simple.getQuestionId();
            this.title = simple.getTitle();
            this.content = simple.getContent();
            this.user = simple.getUser();
            this.createdAt = simple.getCreatedAt();
            this.votes = simple.getVotes();
            this.view = simple.getView();
            this.answers = simple.getAnswers();
            this.tags = simple.getTags().split(" ");
        }
    }
}
