package com.pre007.server.user.service;

import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FindUserService {

    private final UserRepository userRepository;

    public User id(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User displayName(String displayName) {
        return userRepository.findByDisplayName(displayName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User email(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public void isPermission(User user, String email) {
        if (!user.getEmail().equals(email)) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
    }
}
