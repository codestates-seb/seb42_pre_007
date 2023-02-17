package com.pre007.server.user.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreatedDto {

    @NotNull
    private String displayName;

    @Email
    private String email;

    @NotNull
    private String password;
}
