package com.pre007.server.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseSimple {

    private Long userId;

    private String displayName;

    private String email;
}
