package com.pre007.server.user.entity;

import lombok.*;
import org.hibernate.type.DateType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;

    private String password;

    private String displayName;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modified = LocalDateTime.now();
}
