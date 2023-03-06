package com.pre007.server.globaldto;

import com.pre007.server.question.dto.QuestionSearch;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageableInfo {

    private Integer page;
    private Integer size;
    private String tag;
    private String q;
    private Integer resultCount;
    private Long totalCount;

    public PageableInfo editByQuestionSearch(QuestionSearch questionSearch) {
        this.page = questionSearch.getPage();
        this.size = questionSearch.getSize();
        this.tag = questionSearch.getTag();
        this.q = questionSearch.getQ();
        return this;
    }
}
