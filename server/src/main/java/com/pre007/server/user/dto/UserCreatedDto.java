package com.pre007.server.user.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreatedDto {

    @Size(min = 3, max = 15 ,message = "DisplayName의 길이는 3이상 15이하여야 합니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ|ㅏ-ㅣ|가-핳|a-z|A-Z|0-9]+$", message = "한글, 숫자, 알파벳만 사용 가능합니다.")
    private String displayName;

    @Email(message = "이메일 형식을 알맞게 입력했는지 확인해주세요.")
    private String email;

    @Size(min = 7, message = "패스워드는 7자리 이상이어야 합니다.")
    private String password;
}
