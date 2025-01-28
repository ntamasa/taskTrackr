package com.tasktrackr.backend.service;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.model.Task;
import com.tasktrackr.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getAllTasksByDate(Date date) {
        List<Task> tasks = taskRepository.findAllByDate(date);
        if (tasks.isEmpty())
            throw new IllegalArgumentException("No tasks found for the given date");
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO createTask(TaskDTO dto) {
        Task newTask = taskRepository.save(buildTask(dto.getName(), dto.getDescription(), dto.isImportant()));
        return convertToDTO(newTask);
    }

    // Private helper methods ------------------------------------------------
    private Task buildTask(String name, String description, boolean isImportant) {
        return Task.builder()
                .name(name)
                .description(description)
                .date(new Date())
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
