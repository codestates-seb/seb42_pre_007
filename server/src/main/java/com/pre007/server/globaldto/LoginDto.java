package com.pre007.server.globaldto;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class LoginDto {

    // @Email(message = "이메일 형식을 알맞게 입력했는지 확인해주세요.")
    private String email;

    // @Size(min = 7, message = "패스워드는 7자리 이상이어야 합니다.")
    private String password;
}
