package com.pre007.server.user.controller;

import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid UserCreatedDto dto) {
        Long id = userService.create(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUser(id));
    }
}
