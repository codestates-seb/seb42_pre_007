package com.pre007.server.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.service.UserService;
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

//@SpringBootTest
//@Transactional
//@AutoConfigureMockMvc
class UserControllerTest {
//
//    @Autowired
//    Gson gson;
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    UserService userService;
//
//    @Test
//    @DisplayName("회원가입이 성공적으로 이루어져야 합니다.")
//    public void createUserSuccess() throws Exception {
//        //given
//        UserCreatedDto dto = new UserCreatedDto("asdf6", "asdf6@asdf.com", "asdf1234");
//        String body = gson.toJson(dto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(post("/users/signup")
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