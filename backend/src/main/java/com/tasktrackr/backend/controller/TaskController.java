package com.tasktrackr.backend.controller;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskDTO>> getALlTasks() {
        Long userId = getIdOfLoggedInUser();
        return ResponseEntity.ok(taskService.getAllTasks(userId));
    }

    @GetMapping("/")
    public ResponseEntity<List<TaskDTO>> getAllTasksForUser() {
        Long userId = getIdOfLoggedInUser();
        return ResponseEntity.ok(taskService.getAllTasksForUser(userId));
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<TaskDTO>> getAllTasksByDate(@PathVariable("date")
                                                               @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                           LocalDate date) {
        Long userId = getIdOfLoggedInUser();
        return ResponseEntity.ok(taskService.getAllTasksByDate(date));
    }

    @PostMapping("/new")
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskDTO dto) {
        Long userId = getIdOfLoggedInUser();
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    private Long getIdOfLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();
        return user.getId();
    }
}
