package com.pre007.server.question.repository;

import com.pre007.server.globaldto.PageableInfo;
import com.pre007.server.question.dto.QuestionSearch;
import com.pre007.server.question.dto.QuestionResponseSimple;

import java.util.List;

public interface QuestionRepositoryCustom {

    List<PageableInfo> getQuestionsCount();
    List<QuestionResponseSimple> getQuestionsByQuestionPage(QuestionSearch questionSearch);
}
