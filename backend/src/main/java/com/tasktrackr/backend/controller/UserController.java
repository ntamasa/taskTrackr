package com.tasktrackr.backend.controller;

import com.tasktrackr.backend.dto.UserDTO;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ----- GET -----
    // --- User related

    // Get user information for profiles page
    @GetMapping("/profile")
    public UserDTO getUserProfile() throws Exception {
        String email = authenticateUser();
        return userService.getUserProfile(email);
    }

    // --- Admin related

    // Get all users
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // ----- Private helper methods -----
    // Authenticate user and get their ID
    private String authenticateUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();
        return user.getEmail();
    }
}
