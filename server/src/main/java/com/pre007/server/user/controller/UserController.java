package com.pre007.server.user.controller;

import com.pre007.server.auth.userdetails.UserDetailsServiceImpl;
import com.pre007.server.globaldto.ResponseDto;
import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.dto.UserResponseSimple;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid UserCreatedDto dto) {
        Long id = userService.create(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 201));
    }

    @PostMapping("/auth") // email을 받아오고 조회해서 쿼리문을 한번더 날릴 필요가 있을까?
    public ResponseEntity authenticateUser(@AuthenticationPrincipal String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(userService.getUserSimpleByEmail(email), 200));
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUser(id));
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
