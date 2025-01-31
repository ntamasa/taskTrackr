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
import java.util.Set;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // ----- GET -----
    // --- User related

    // Get tasks for a date
    @GetMapping("/{date}")
    public ResponseEntity<List<TaskDTO>> getAllTasksByDate(@PathVariable("date")
                                                           @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                           LocalDate date) {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.getAllTasksByDate(userId, date));
    }
    // Get all favourite tasks with unique names
    @GetMapping("/favourites")
    public ResponseEntity<Set<TaskDTO>> getAllFavouriteTasks() {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.getAllFavouriteTasks(userId));
    }

    // --- Admin related
    // Get all users' tasks
    @GetMapping("/all")
    public ResponseEntity<List<TaskDTO>> getALlTasks() {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.getAllTasks(userId));
    }

    // ----- POST, PUT, PATCH -----
    // --- Task related

    // Create a new task
    @PostMapping("/new")
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskDTO dto) {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    // Duplicate a task
    @PostMapping("/duplicate/{taskId}")
    public ResponseEntity<TaskDTO> duplicateTask(@PathVariable @Valid Long taskId) {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.duplicateTask(taskId, userId));
    }
    // Duplicate a task to a specific date
    @PostMapping("/duplicate/{taskId}/{date}")
    public ResponseEntity<TaskDTO> duplicateTaskTo(@PathVariable @Valid Long taskId,
                                                   @PathVariable("date") @Valid
                                                   @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                   LocalDate date) {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.duplicateTaskTo(taskId, userId, date));
    }
    // Update a task
    @PatchMapping("/update/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable @Valid Long taskId,
                                              @RequestBody TaskDTO dto) {
        Long userId = authenticateUser();
        return ResponseEntity.ok(taskService.updateTask(taskId, dto, userId));
    }

    // ----- DELETE -----
    // Delete a task
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable @Valid Long taskId) {
        Long userId = authenticateUser();
        taskService.deleteTask(taskId, userId);
        return ResponseEntity.ok("Successfully deleted task with id: " + taskId);
    }

    // Delete task if older than a certain date
    @DeleteMapping("/deleteOld")
    public ResponseEntity<String> deleteOldTasks(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = authenticateUser();
        taskService.deleteOldTasks(date, userId);
        return ResponseEntity.ok("Successfully deleted tasks older than: " + date);
    }


    // ----- Private helper methods -----
    // Authenticate user and get their ID
    private Long authenticateUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();
        return user.getId();
    }
}
