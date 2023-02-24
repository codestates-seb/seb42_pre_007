package com.pre007.server.question.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class QuestionPage {
    @Positive
    private int page;

//    private String tab;
}
