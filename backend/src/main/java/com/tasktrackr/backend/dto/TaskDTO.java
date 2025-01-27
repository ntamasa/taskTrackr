package com.tasktrackr.backend.dto;

import java.util.Date;

public record TaskDTO (
    String name,
    String description,
    Date date,
    boolean isCompleted,
    boolean isFavourite,
    boolean isImportant
) {}
