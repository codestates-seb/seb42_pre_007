package com.pre007.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDto<T>{
    private T data;
    private int code;

}
