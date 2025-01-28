package com.tasktrackr.backend.controller;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/")
    public List<TaskDTO> getALlTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{date}")
    public List<TaskDTO> getAllTasksByDate(@PathVariable("date") Date date) {
        return taskService.getAllTasksByDate(date);
    }

    @PostMapping("/new")
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskDTO dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }
}
