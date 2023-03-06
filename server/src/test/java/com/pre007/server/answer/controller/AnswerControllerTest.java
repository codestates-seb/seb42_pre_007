package com.pre007.server.answer.controller;

import com.google.gson.Gson;
import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.service.AnswerService;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.question.service.QuestionService;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import com.pre007.server.user.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@SpringBootTest
//@Transactional
//@AutoConfigureMockMvc
//@TestInstance(TestInstance.Lifecycle.PER_CLASS) // @BeforeAll을 위해
class AnswerControllerTest {
//
//    @Autowired
//    Gson gson;
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    AnswerService answerService;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    QuestionService questionService;
//
//    User user;
//
//    @BeforeAll
//    void createUser() {
//        user = new User();
//        user.setEmail("asdf@asdf.com");
//        user.setPassword("asdf1234");
//        user.setDisplayName("asdf");
//
//        user = userRepository.save(user);
//    }
//
//    @Test
//    @DisplayName("답변글이 성공적으로 생성되어야 합니다.")
//    public void createAnswerSuccess() throws Exception {
//        //given
//        QuestionPostDto questionPostDto = new QuestionPostDto("foo", "bar", "asdf");
//        Long questionId = questionService.createQuestion(questionPostDto);
//
//        AnswerCreateDto answerCreateDto = new AnswerCreateDto(user.getDisplayName(), "hello");
//        String body = gson.toJson(answerCreateDto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(post("/questions/" + questionId + "/answer/submit")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(body));
//
//        //then
//        actions
//                .andExpect(status().isCreated())
//                .andDo(print());
//    }
}