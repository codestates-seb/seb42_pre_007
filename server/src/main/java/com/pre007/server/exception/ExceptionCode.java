package com.pre007.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(400, "user not found"),
    USER_EXISTS(400, "user exists"),
    QUESTION_NOT_FOUND(400, "question not found"),
    INVALID_TOKEN(400, "invalid token"),
    ALREADY_VOTED(400, "already voted");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
