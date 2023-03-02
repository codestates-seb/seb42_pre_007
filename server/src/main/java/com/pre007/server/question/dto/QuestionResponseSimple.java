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
        private Long votes = 0L;
        private Integer view = 0;
        private Long answers = 0L;
        private String[] tags;

        public QuestionResponseSimpleDto(QuestionResponseSimple simple) {
            this.questionId = simple.getQuestionId();
            this.title = simple.getTitle();
            this.content = simple.getContent();
            this.user = simple.getUser();
            this.createdAt = simple.getCreatedAt();
            this.votes = (long) simple.getVotes() / simple.getAnswers();
            this.view = simple.getView();
            this.answers = simple.getAnswers();
            this.tags = simple.getTags().split(" ");
        }
    }
}
