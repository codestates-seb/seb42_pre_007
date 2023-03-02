package com.pre007.server.question.repository;

import com.pre007.server.answer.entity.QAnswer;
import com.pre007.server.globaldto.PageableInfo;
import com.pre007.server.question.dto.QuestionSearch;
import com.pre007.server.question.dto.QuestionResponseSimple;
import com.pre007.server.question.entity.QQuestion;
import com.pre007.server.question.entity.QQuestionVote;
import com.pre007.server.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class QuestionRepositoryCustomImpl implements QuestionRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<PageableInfo> getQuestionsCount() {

        QQuestion question = QQuestion.question;

        List<PageableInfo> result = jpaQueryFactory
                .select(Projections.fields(PageableInfo.class,
                        question.count().as("totalCount")))
                .from(question)
                .fetch();

        return result;
    }

    @Override
    public List<QuestionResponseSimple> getQuestionsByQuestionPage(QuestionSearch questionSearch) {

        QQuestion question = QQuestion.question;
        QUser user = QUser.user;
        QAnswer answer = QAnswer.answer;
        QQuestionVote vote = QQuestionVote.questionVote;

        List<QuestionResponseSimple> result = jpaQueryFactory
                .select(Projections.fields(QuestionResponseSimple.class,
                        question.questionId,
                        question.title,
                        question.content,
                        user.displayName.as("user"),
                        question.createdAt,
                        vote.voteQ.sum().as("votes"),
                        question.view,
                        answer.count().as("answers"),
                        question.tags))
                .from(question)
                .join(question.user, user)
                .on(question.user.userId.eq(user.userId))
                .leftJoin(question.answers, answer)
                .on(question.questionId.eq(answer.question.questionId))
                .leftJoin(question.votes, vote)
                .on(question.questionId.eq(vote.question.questionId))
                .where(tagEq(questionSearch, question)) // 태그검색
                .where(questionEq(questionSearch, question)) // 단어검색
                .groupBy(question.questionId)
                .limit(questionSearch.getSize())
                .offset((long) (questionSearch.getPage() - 1) * questionSearch.getSize())
                .orderBy(question.questionId.desc())
                .fetch();

        return result;
    }

    private static BooleanExpression tagEq(QuestionSearch questionSearch, QQuestion question) {
        if (questionSearch.getTag() == null) {
            return null;
        }
        return question.tags.contains(questionSearch.getTag());
    }

    private static BooleanExpression questionEq(QuestionSearch questionSearch, QQuestion question) {
        if (questionSearch.getQ() == null) {
            return null;
        }
        return question.content.contains(questionSearch.getQ())
                .or(question.title.contains(questionSearch.getQ()));
    }
}
