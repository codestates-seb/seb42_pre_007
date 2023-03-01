package com.pre007.server.user.repository;

import com.pre007.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByDisplayName(String displayName);

    Optional<User> findByEmail(String email);

    @Query("select u from User u join fetch u.roles where u.email = :email")
    Optional<User> getUserAndRoles(String email);
}
