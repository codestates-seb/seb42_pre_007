package com.pre007.server.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.Gson;
import com.pre007.server.auth.jwt.JwtTokenizer;
import com.pre007.server.globaldto.ErrorResponse;
import com.pre007.server.globaldto.LoginDto;
import com.pre007.server.user.dto.UserResponseDto;
import com.pre007.server.user.dto.UserResponseSimple;
import com.pre007.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.web.servlet.server.CookieSameSiteSupplier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final ObjectMapper objectMapper;


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                               HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        User user = (User) authResult.getPrincipal();

        String accessToken = jwtTokenizer.generateAccessTokenByUser(user);
        String refreshToken = jwtTokenizer.generateRefreshTokenByUser(user);

        // header
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        // cookie
        ResponseCookie cookie = ResponseCookie
                .from("Authorization", "Bearer"+accessToken)
                .path("/")
                .sameSite("None")
                .httpOnly(false)
                .secure(true)
                .maxAge(jwtTokenizer.getAccessTokenExpirationMinutes())
                .build();

        ResponseCookie refresh = ResponseCookie
                .from("Refresh", refreshToken)
                .path("/")
                .sameSite("None")
                .httpOnly(false)
                .secure(true)
                .maxAge(jwtTokenizer.getRefreshTokenExpirationMinutes())
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        response.addHeader("Set-Cookie", refresh.toString());

        // body
        UserResponseSimple dto = new UserResponseSimple();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setDisplayName(user.getDisplayName());
        //dto.setCreatedAt(user.getCreatedAt());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
//        response.getWriter().write(gson.toJson(dto));
        response.getWriter().write(objectMapper
//                .registerModule(new JavaTimeModule()) // LocalDateTime 값은 안보내기로 함
                .writeValueAsString(dto));


        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

//    private String delegateAccessToken(User user) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", user.getEmail());
//        claims.put("roles", user.getRoles());
//
//        String subject = user.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//
//        String accessToken =
//                jwtTokenizer.generateAccessToken(
//                        claims,
//                        subject,
//                        expiration);
//
//        return accessToken;
//    }
//
//    private String delegateRefreshToken(User user) {
//        String subject = user.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//
//        String refreshToken =
//                jwtTokenizer.generateRefreshToken(
//                        subject,
//                        expiration);
//
//        return refreshToken;
//    }
}
