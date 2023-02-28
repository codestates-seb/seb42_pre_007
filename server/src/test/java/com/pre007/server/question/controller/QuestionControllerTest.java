package com.pre007.server.question.controller;

import com.google.gson.Gson;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.question.dto.QuestionPatchDto;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.entity.Question;
import com.pre007.server.question.repository.QuestionRepository;
import com.pre007.server.question.service.QuestionService;
import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.service.FindUserService;
import com.pre007.server.user.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest
//@Transactional
//@AutoConfigureMockMvc
class QuestionControllerTest {
//
//    @Autowired
//    Gson gson;
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    QuestionService questionService;
//
//    @Autowired
//    UserService userService;
//
//    @Autowired
//    FindUserService findUserService;
//
//    @Autowired
//    QuestionRepository questionRepository;
//
//    @Test
//    @DisplayName("글생성이 성공적으로 이루어져야 합니다.")
//    public void createQuestionSuccess() throws Exception {
//        //given
//        UserCreatedDto user = new UserCreatedDto("asdf1", "asdf1@asdf.com", "asdf1234");
//        createUser(user);
//
//        QuestionPostDto dto = new QuestionPostDto("foo", "bar", user.getDisplayName());
//        String body = gson.toJson(dto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(post("/questions/ask")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(body));
//
//        //then
//        actions
//                .andExpect(status().isCreated())
//                .andDo(print());
//    }
//
//    @Test
//    @DisplayName("글조회가 성공적으로 이루어져야 합니다.")
//    public void getQuestionSuccess() throws Exception {
//        //given
//        UserCreatedDto user = new UserCreatedDto("asdf2", "asdf2@asdf.com", "asdf1234");
//        createUser(user);
//
//        QuestionPostDto dto = new QuestionPostDto("foo", "bar", user.getDisplayName());
//        Long questionId = createQuestion(dto);
//
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(get("/questions/" + questionId)
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.questionId").value(questionId))
//                .andExpect(jsonPath("$.data.title").value(dto.getTitle()))
//                .andExpect(jsonPath("$.data.content").value(dto.getContent()))
//                .andExpect(jsonPath("$.data.user").value(dto.getUser()))
//                .andDo(print());
//    }
//
//    @Test
//    @DisplayName("글수정이 성공적으로 이루어져야 합니다.")
//    public void updateQuestionSuccess() throws Exception {
//        //given
//        UserCreatedDto user = new UserCreatedDto("asdf3", "asdf3@asdf.com", "asdf1234");
//        createUser(user);
//
//        QuestionPostDto questionPostDto = new QuestionPostDto("foo", "bar", user.getDisplayName());
//        Long questionId = createQuestion(questionPostDto);
//
//        QuestionPatchDto dto = new QuestionPatchDto("hello", "world", user.getDisplayName());
//        String body = gson.toJson(dto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(patch("/questions/" + questionId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(body));
//
//        ResultActions actions2 =
//                mockMvc.perform(get("/questions/" + questionId)
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        actions.andExpect(status().isOk());
//
//        actions2
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.questionId").value(questionId))
//                .andExpect(jsonPath("$.data.title").value(dto.getTitle()))
//                .andExpect(jsonPath("$.data.content").value(dto.getContent()))
//                .andExpect(jsonPath("$.data.user").value(dto.getUser()))
//                .andDo(print());
//    }
//
//    @Test
//    @DisplayName("글삭제가 성공적으로 이루어져야 합니다.")
//    public void deleteQuestionSuccess() throws Exception {
//        //givne
//        UserCreatedDto user = new UserCreatedDto("asdf4", "asdf@asdf4.com", "asdf1234");
//        createUser(user);
//
//        QuestionPostDto questionPostDto = new QuestionPostDto("foo", "bar", user.getDisplayName());
//        Long questionId = createQuestion(questionPostDto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(delete("/questions/" + questionId)
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print());
//        Assertions.assertThrows(BusinessLogicException.class, () ->
//                questionService.getQuestion(questionId));
//    }
//
//    // 서비스 테스트로 빼야하나
//    @Test
//    @DisplayName("질문글 페이징 조회가 성공적으로 이루어져야 합니다.")
//    public void getQuestionsByQuestionPage() throws Exception {
//        //given
//        UserCreatedDto user = new UserCreatedDto("asdf5", "asdf5@asdf.com", "asdf1234");
//        createUser(user);
//
//        QuestionPostDto questionPostDto1 = new QuestionPostDto("foo1", "bar1", user.getDisplayName());
//        Long questionId1 = createQuestion(questionPostDto1);
//
//        QuestionPostDto questionPostDto2 = new QuestionPostDto("foo2", "bar2", user.getDisplayName());
//        Long questionId2 = createQuestion(questionPostDto2);
//
//        QuestionPostDto questionPostDto3 = new QuestionPostDto("foo3", "bar3", user.getDisplayName());
//        Long questionId3 = createQuestion(questionPostDto3);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(get("/questions")
//                        .param("page", "1")
//                        .accept(MediaType.APPLICATION_JSON));
//
//        //then
//        actions
//                .andExpect(status().isOk())
//                .andDo(print());
//    }
//
//
//    public Long createQuestion(QuestionPostDto dto) {
//        return questionService.createQuestion(dto);
//    }
//
//    public Long createUser(UserCreatedDto dto) {
//        return userService.create(dto);
//    }

}