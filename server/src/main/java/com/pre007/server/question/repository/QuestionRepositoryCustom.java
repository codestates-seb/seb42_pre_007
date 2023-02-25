package com.pre007.server.question.repository;

import com.pre007.server.question.dto.QuestionPage;
import com.pre007.server.question.dto.QuestionResponseSimple;

import java.util.List;

public interface QuestionRepositoryCustom {

    List<QuestionResponseSimple> getQuestionsByQuestionPage(QuestionPage questionPage);
}
