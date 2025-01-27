package com.tasktrackr.backend.mapper;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.model.Task;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TaskDTOMapper implements Function<Task, TaskDTO> {
    @Override
    public TaskDTO apply(Task task) {
        return new TaskDTO(task.getName(), task.getDescription(), task.getDate(), task.isCompleted(), task.isFavourite(), task.isImportant());
    }
}
