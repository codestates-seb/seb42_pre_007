package com.pre007.server.auth.userdetails;

import com.pre007.server.auth.authorityutils.CustomAuthorityUtils;
import com.pre007.server.exception.BusinessLogicException;
import com.pre007.server.exception.ExceptionCode;
import com.pre007.server.user.entity.User;
import com.pre007.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return new UserDetailsImpl(findUser);
    }

    /**
     * 클래스 네이밍이 좀 별로인듯. 적당한게 없을까?
     */
    private final class UserDetailsImpl extends User implements UserDetails {

        // 리팩토링 필요 (entity에 setter 사용 배제시)
        UserDetailsImpl(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles()); // 확장 가능성
        }
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            // return authorityUtils.createAuthorities(this.getRoles());
            return authorityUtils.createAuthorities(this.getEmail());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
