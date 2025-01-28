package com.tasktrackr.backend.repository;

import com.tasktrackr.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
    void deleteByToken(String token);
}
