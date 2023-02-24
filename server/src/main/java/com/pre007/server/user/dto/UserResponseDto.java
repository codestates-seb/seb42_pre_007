package com.pre007.server.user.dto;

import com.pre007.server.user.entity.User;
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

    public static UserResponseDto fromEntity(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setUserId(user.getUserId());
        dto.setDisplayName(user.getDisplayName());
        return dto;
    }
}
