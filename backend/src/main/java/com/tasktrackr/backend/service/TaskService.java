package com.tasktrackr.backend.service;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.model.Role;
import com.tasktrackr.backend.model.Task;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.repository.TaskRepository;
import com.tasktrackr.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO> getAllTasks(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getRole().equals(Role.USER)) // if user is admin
            throw new IllegalArgumentException("You are not authorized to view this page");

        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getAllTasksForUser(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks.isEmpty())
            throw new IllegalArgumentException("No tasks found for the given user");
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getAllTasksByDate(LocalDate date) {
        List<Task> tasks = taskRepository.findAllByDate(date);
        if (tasks.isEmpty())
            throw new IllegalArgumentException("No tasks found for the given date");
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO createTask(TaskDTO dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Task newTask = buildTask(dto.getName(), dto.getDescription(), dto.isImportant());
        newTask.setUser(user);
        taskRepository.save(newTask);
        return convertToDTO(newTask);
    }

    // Private helper methods ------------------------------------------------
    private Task buildTask(String name, String description, boolean isImportant) {
        return Task.builder()
                .name(name)
                .description(description)
                .date(LocalDate.now())
                .isCompleted(false)
                .isFavourite(false)
                .isImportant(isImportant)
                .build();
    }

    private TaskDTO convertToDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .date(task.getDate())
                .isComplete(task.isCompleted())
                .isFavourite(task.isFavourite())
                .isImportant(task.isImportant())
                .build();
    }




}
