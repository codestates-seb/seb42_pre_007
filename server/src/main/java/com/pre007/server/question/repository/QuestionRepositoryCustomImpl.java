package com.pre007.server.question.repository;

import com.pre007.server.answer.entity.QAnswer;
import com.pre007.server.question.dto.QuestionPage;
import com.pre007.server.question.dto.QuestionResponseSimple;
import com.pre007.server.question.entity.QQuestion;
import com.pre007.server.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class QuestionRepositoryCustomImpl implements QuestionRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<QuestionResponseSimple> getQuestionsByQuestionPage(QuestionPage questionPage) {
        QQuestion question = QQuestion.question;
        QUser user = QUser.user;
        QAnswer answer = QAnswer.answer;

        List<QuestionResponseSimple> result = jpaQueryFactory
                .select(Projections.fields(QuestionResponseSimple.class,
                        question.questionId,
                        question.title,
                        question.content,
                        user.displayName,
                        question.createdAt,
                        question.votes,
                        question.view,
                        answer.count().as("answers")))
                .from(question)
                .join(question.user, user)
                .on(question.user.userId.eq(user.userId))
                .leftJoin(question.answers, answer)
                .on(question.questionId.eq(answer.question.questionId))
                .groupBy(question.questionId)
                .limit(30)
                .offset((long) (questionPage.getPage() - 1) * 30)
                .orderBy(question.questionId.desc())
                .fetch();

        return result;
    }
}
