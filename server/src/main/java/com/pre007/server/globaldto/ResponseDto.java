package com.pre007.server.globaldto;

import lombok.Data;

@Data
public class ResponseDto<T> {

    private T data;
    private Integer code;

    public ResponseDto(T data, Integer code) {
        this.data = data;
        this.code = code;
    }
}
