package com.tasktrackr.backend.service;

import ch.qos.logback.classic.spi.IThrowableProxy;
import com.tasktrackr.backend.dto.UserDTO;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    // ----- GET -----
    // --- User related

    // Get user information for profiles page
    public UserDTO getUserProfile(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(this::convertToDTO).orElse(null); // user is authenticated, so it should always be present
    }

    // --- Admin related

    // Get all users
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ----- Private helper methods -----
    // Model to DTO
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
    }

}
