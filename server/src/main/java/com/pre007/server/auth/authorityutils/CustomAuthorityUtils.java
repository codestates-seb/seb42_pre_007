package com.pre007.server.auth.authorityutils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 요구사항에 권한을 나눠서 쓰는 내용이 없었기에 일단 권한은 USER만 만들어서 사용.
 * 추후 권한에 따라 접근을 제한하는 경우를 상정해 확장가능성을 남겨둠.
 */

public class CustomAuthorityUtils {

    private final List<GrantedAuthority> USER_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_USER");

    public List<GrantedAuthority> createAuthorities(String email) {
        return USER_ROLES;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String email) {
//        return USER_ROLES.stream()
//                .map(GrantedAuthority::getAuthority)
//                .map(s -> s.replaceAll("ROLE_", ""))
//                .collect(Collectors.toList());

        return USER_ROLES.stream()
                .map(a -> a.getAuthority()
                        .replaceAll("ROLE_", ""))
                .collect(Collectors.toList());
    }
}
