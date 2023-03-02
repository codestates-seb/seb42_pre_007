package com.pre007.server.globaldto;

import lombok.Data;

@Data
public class PageableResponseDto<T> {

    private T data;
    private PageableInfo pageableInfo;
    private Integer code;

    public PageableResponseDto(T data,
                               Integer code,
                               PageableInfo pageableInfo) {
        this.data = data;
        this.code = code;
        this.pageableInfo = pageableInfo;
    }
}
