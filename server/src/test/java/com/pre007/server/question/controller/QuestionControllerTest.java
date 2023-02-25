package com.pre007.server.question.controller;

import com.google.gson.Gson;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.question.dto.QuestionPatchDto;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.service.QuestionService;
import com.pre007.server.user.dto.UserCreatedDto;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class QuestionControllerTest {

    @Autowired
    Gson gson;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    QuestionService questionService;

    @Autowired
    UserService userService;

    @Test
    @DisplayName("글생성이 성공적으로 이루어져야 합니다.")
    public void createQuestionSuccess() throws Exception {
        //given
        UserCreatedDto user = new UserCreatedDto("asdf", "asdf@asdf.com", "asdf1234");
        createUser(user);

        QuestionPostDto dto = new QuestionPostDto("foo", "bar", "asdf");
        String body = gson.toJson(dto);

        //when
        ResultActions actions =
                mockMvc.perform(post("/questions/ask")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body));

        //then
        actions
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @DisplayName("글조회가 성공적으로 이루어져야 합니다.")
    public void getQuestionSuccess() throws Exception {
        //given
        UserCreatedDto user = new UserCreatedDto("asdf", "asdf@asdf.com", "asdf1234");
        createUser(user);

        QuestionPostDto dto = new QuestionPostDto("foo", "bar", "asdf");
        Long questionId = createQuestion(dto);


        //when
        ResultActions actions =
                mockMvc.perform(get("/questions/" + questionId)
                        .accept(MediaType.APPLICATION_JSON));

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(questionId))
                .andExpect(jsonPath("$.data.title").value(dto.getTitle()))
                .andExpect(jsonPath("$.data.content").value(dto.getContent()))
                .andExpect(jsonPath("$.data.user").value(dto.getUser()))
                .andDo(print());
    }

    @Test
    @DisplayName("글수정이 성공적으로 이루어져야 합니다.")
    public void updateQuestionSuccess() throws Exception {
        //given
        UserCreatedDto user = new UserCreatedDto("asdf", "asdf@asdf.com", "asdf1234");
        createUser(user);

        QuestionPostDto questionPostDto = new QuestionPostDto("foo", "bar", "asdf");
        Long questionId = createQuestion(questionPostDto);

        QuestionPatchDto dto = new QuestionPatchDto("hello", "world", "asdf");
        String body = gson.toJson(dto);

        //when
        ResultActions actions =
                mockMvc.perform(patch("/questions/" + questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body));

        ResultActions actions2 =
                mockMvc.perform(get("/questions/" + questionId)
                        .accept(MediaType.APPLICATION_JSON));

        //then
        actions.andExpect(status().isOk());

        actions2
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(questionId))
                .andExpect(jsonPath("$.data.title").value(dto.getTitle()))
                .andExpect(jsonPath("$.data.content").value(dto.getContent()))
                .andExpect(jsonPath("$.data.user").value(dto.getUser()))
                .andDo(print());
    }

    @Test
    @DisplayName("글삭제가 성공적으로 이루어져야 합니다.")
    public void deleteQuestionSuccess() throws Exception {
        //givne
        UserCreatedDto user = new UserCreatedDto("asdf", "asdf@asdf.com", "asdf1234");
        createUser(user);

        QuestionPostDto questionPostDto = new QuestionPostDto("foo", "bar", "asdf");
        Long questionId = createQuestion(questionPostDto);

        //when
        ResultActions actions =
                mockMvc.perform(delete("/questions/" + questionId)
                        .accept(MediaType.APPLICATION_JSON));

        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(print());
        Assertions.assertThrows(BusinessLogicException.class, () ->
                questionService.getQuestion(questionId));
    }


    public Long createQuestion(QuestionPostDto dto) {
        return questionService.createQuestion(dto);
    }

    public Long createUser(UserCreatedDto dto) {
        return userService.create(dto);
    }

}