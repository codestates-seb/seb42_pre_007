package com.pre007.server.question.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionSearch {

    private Integer page;
    private Integer size;
    private String tab;
    private String q;


    public QuestionSearch(Integer page, Integer size, String tab, String q) {
        this.page = (page == null) ? 1 : Math.max(page, 1);
        this.size = (size < 50) ? 30 : 50;
        this.tab = tab;
        this.q = q;
    }
}
