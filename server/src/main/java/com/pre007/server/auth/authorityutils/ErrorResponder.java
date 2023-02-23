package com.pre007.server.auth.authorityutils;

import com.google.gson.Gson;
import com.pre007.server.globaldto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ResponseDto dto = new ResponseDto<>(status, 400); // 수정 필요
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(dto, ResponseDto.class));
    }
}
