package com.tasktrackr.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private String description;

    private Date date;
    private boolean isComplete;
    private boolean isFavourite;
    private boolean isImportant;
}
