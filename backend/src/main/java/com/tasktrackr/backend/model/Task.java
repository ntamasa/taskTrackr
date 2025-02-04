package com.tasktrackr.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @ElementCollection(targetClass = Recurrence.class)
    @Enumerated(EnumType.STRING)
    private List<Recurrence> recurrences;
    private LocalDate nextDueDate;
    private LocalDate recurrenceStartDate;
    private LocalDate recurrenceEndDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void addRecurrence(Recurrence recurrence) {
        if (!this.recurrences.contains(recurrence))
            this.recurrences.add(recurrence);
    }

    public void removeRecurrence(Recurrence recurrence) {
        if (this.recurrences.contains(recurrence)) {
            if (this.recurrences.size() == 1) // only this item left
                this.recurrences = new ArrayList<>(List.of(Recurrence.NONE));
            else
                this.recurrences.remove(recurrence);
        }

    }
}
