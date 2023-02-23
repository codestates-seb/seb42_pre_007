package com.pre007.server.globaldto;

import lombok.Data;
import lombok.Getter;

@Data
public class LoginDto {
    private String email;
    private String password;
}
