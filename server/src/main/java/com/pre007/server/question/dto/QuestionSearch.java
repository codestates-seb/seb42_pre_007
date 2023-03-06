package com.pre007.server.question.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionSearch {

    private Integer page;
    private Integer size;
    private String tag;
    private String q;


    public QuestionSearch(Integer page, Integer size, String tag, String q) {
        this.page = (page == null) ? 1 : Math.max(page, 1);
        this.size = (size == null) ? 30 : (size < 50) ? 30 : 50;
        this.tag = tag;
        this.q = q;
    }
}
