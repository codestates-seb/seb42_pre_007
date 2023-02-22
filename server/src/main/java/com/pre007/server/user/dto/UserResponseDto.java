package com.pre007.server.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private Long userId;

    private String displayName;

    private String email;

    private LocalDateTime createdAt;
}
