package com.pre007.server.user.dto;

import lombok.Data;

@Data
public class UserResponseSimple {

    private Long userId;

    private String displayName;

    private String email;
}
