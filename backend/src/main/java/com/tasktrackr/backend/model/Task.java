package com.tasktrackr.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String description;

    private LocalDate date;
    private Boolean isCompleted;
    private Boolean isFavourite;
    private Boolean isImportant;

    @Enumerated(EnumType.STRING)
    private Recurrence recurrence;
    private LocalDate nextDueDate;
    private LocalDate recurrenceStartDate;
    private LocalDate recurrenceEndDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
