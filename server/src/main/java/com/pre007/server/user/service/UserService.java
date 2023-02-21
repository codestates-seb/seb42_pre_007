package com.pre007.server.user.service;

import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.dto.UserResponseDto;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long create(UserCreatedDto dto) {
        User user = new User();
        user.setDisplayName(dto.getDisplayName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        return userRepository.save(user).getUserId();
    }

    public UserResponseDto findUser(Long id) {
        User findUser = userRepository.findById(id).get();

        UserResponseDto dto = new UserResponseDto();

        dto.setUserId(findUser.getUserId());
        dto.setDisplayName(findUser.getDisplayName());
        dto.setEmail(findUser.getEmail());
        dto.setCreatedAt(findUser.getCreatedAt());

        return dto;
    }
}