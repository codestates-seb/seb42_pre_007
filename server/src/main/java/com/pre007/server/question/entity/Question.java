package com.pre007.server.question.entity;

import com.pre007.server.answer.entity.Answer;
import com.pre007.server.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(length = 20, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Integer votes = 0;

    private Integer view = 0;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<QuestionTag> tags = new ArrayList<>();

    private String tags;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modified = LocalDateTime.now();

//    public List<QuestionTag> setTags(List<QuestionTag> tags) {
//        this.tags = tags;
//        return tags.stream()
//                .map(questionTag -> questionTag.setQuestion(this))
//                .collect(Collectors.toList());
//    }
}
