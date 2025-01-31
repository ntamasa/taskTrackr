package com.tasktrackr.backend.repository;

import com.tasktrackr.backend.model.Task;
import com.tasktrackr.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByDate(LocalDate date);
    List<Task> findAllByDateAndUserId(LocalDate date, Long userId);
    List<Task> findByUserId(Long userId);

    @Query("SELECT t FROM Task t WHERE t.date < ?1 AND t.user.id = ?2")
    List<Task> findTasksByDateBeforeAndUserIdEquals(LocalDate date, Long userId);

}
