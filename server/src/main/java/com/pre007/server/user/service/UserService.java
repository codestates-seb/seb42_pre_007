package com.pre007.server.user.service;

import com.pre007.server.auth.authorityutils.CustomAuthorityUtils;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.user.dto.UserCreatedDto;
import com.pre007.server.user.dto.UserResponseDto;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final FindUserService findUserService;

    public Long create(UserCreatedDto dto) {
        verifyExistsEmail(dto.getEmail());
        verifyExistsDisplayName(dto.getDisplayName());

        User user = new User();
        user.setDisplayName(dto.getDisplayName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRoles(authorityUtils.createRoles(dto.getEmail()));

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

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * 밑의 두개 어짜피 익셉션코드도 똑같이쓰는데 묶어서 써볼까
     * 아니면 익셉션코드나 메세지를 구체적으로 나눌까
     *
     * 보통 회원가입 페이지에서는 id 중복검사 기능을 통과해야 회원가입이 가능하다.
     * 그러니 public으로 열어둬서 중복검사 기능에 대체가 가능하도록 하는게 좋을듯?
     */
    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }

    public void verifyExistsDisplayName(String displayName) {
        Optional<User> user = userRepository.findByDisplayName(displayName);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }
}
