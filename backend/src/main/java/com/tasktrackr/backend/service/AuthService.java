package com.tasktrackr.backend.service;

import com.tasktrackr.backend.dto.AuthRequest;
import com.tasktrackr.backend.dto.AuthResponse;
import com.tasktrackr.backend.dto.RegisterRequest;
import com.tasktrackr.backend.dto.UserDTO;
import com.tasktrackr.backend.model.Role;
import com.tasktrackr.backend.model.Token;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.repository.TokenRepository;
import com.tasktrackr.backend.repository.UserRepository;
import com.tasktrackr.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthResponse register(RegisterRequest request) {
        // check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
//        String refreshToken = jwtService.generateRefreshToken(savedUser);
        String refreshToken = "";

        saveUserToken(savedUser, jwtToken);
        return AuthResponse.builder().accessToken(jwtService.generateToken(user)).refreshToken(refreshToken).build();
   }
   public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
         new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found: " + request.getEmail()));
        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder().accessToken(jwtToken).refreshToken("").build();
   }

   private void saveUserToken(User user, String jwtToken) {
       Token token = Token.builder().token(jwtToken).user(user).revoked(false).expired(false).build();
       tokenRepository.save(token);
   }
}
