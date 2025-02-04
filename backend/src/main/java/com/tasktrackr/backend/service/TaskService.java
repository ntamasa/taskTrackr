package com.tasktrackr.backend.service;

import com.tasktrackr.backend.dto.TaskDTO;
import com.tasktrackr.backend.model.Recurrence;
import com.tasktrackr.backend.model.Role;
import com.tasktrackr.backend.model.Task;
import com.tasktrackr.backend.model.User;
import com.tasktrackr.backend.repository.TaskRepository;
import com.tasktrackr.backend.repository.UserRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // ----- GET -----
    // --- User related

    // Get tasks for a date
    public List<TaskDTO> getAllTasksByDate(Long userId, LocalDate date) {
        List<Task> tasks = taskRepository.findAllByDateAndUserId(date, userId);
        if (tasks.isEmpty())
            throw new IllegalArgumentException("No tasks found for the given date");
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    // Get all favourite tasks with unique names
    public Set<TaskDTO> getAllFavouriteTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        Set<String> uniqueNames = new HashSet<>(); // collect unique names
        return tasks.stream()
                .filter(Task::getIsFavourite)
                .filter(task -> uniqueNames.add(task.getName())) // add name to set if not already present
                .map(this::convertToDTO)
                .collect(Collectors.toSet());
    }
    // Get all recurring tasks
    public List<TaskDTO> getAllRecurringTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream()
                .filter(task -> task.getRecurrences() != null)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // --- Admin related

    // Get all users' tasks
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

    // ----- POST, PUT, PATCH -----

    // Create a new task
    public TaskDTO createTask(TaskDTO dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (dto.getRecurrences() == null) // if not defined then set to NONE
            dto.setRecurrences(new ArrayList<>(List.of(Recurrence.NONE)));

        Task newTask = buildTask(dto);
        newTask.setUser(user);
        taskRepository.save(newTask);
        return convertToDTO(newTask);
    }

    // Duplicate a task
    public TaskDTO duplicateTask(Long taskId, Long userId) {
        return duplicateTaskTo(taskId, userId,null);
    }
    // Duplicate a task to a specific date
    public TaskDTO duplicateTaskTo(Long taskId, Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        Task newTask = buildTask(convertToDTO(task));
        newTask.setUser(user);
        List<Recurrence> newRecurrences = new ArrayList<>();
        newRecurrences.add(Recurrence.NONE);
        newTask.setRecurrences(newRecurrences);
        newTask.setRecurrenceStartDate(null);
        newTask.setRecurrenceEndDate(null);
        newTask.setNextDueDate(null);
        if (date != null)
            newTask.setDate(date);
        taskRepository.save(newTask);
        return convertToDTO(newTask);
    }
    // Update task
    public TaskDTO updateTask(Long taskId, TaskDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        // Only update fields that were given in the request body
        if (dto.getName() != null)
            task.setName(dto.getName());
        if (dto.getDescription() != null)
            task.setDescription(dto.getDescription());
        if (dto.getDate() != null)
            task.setDate(dto.getDate());
        if (dto.getIsComplete() != null)
            task.setIsCompleted(dto.getIsComplete());
        if (dto.getIsFavourite() != null)
            task.setIsFavourite(dto.getIsFavourite());
        if (dto.getIsImportant() != null)
            task.setIsImportant(dto.getIsImportant());
        if (dto.getRecurrences() != null) {
            if (dto.getRecurrences().isEmpty()) // if empty then set to NONE
                task.setRecurrences(new ArrayList<>(List.of(Recurrence.NONE)));
            dto.getRecurrences().forEach(rec -> {
                // if it is currently not recurring, set to the new recurrence
                if (task.getRecurrences().size() == 1 && task.getRecurrences().get(0) == Recurrence.NONE)
                    task.setRecurrences(new ArrayList<>(List.of(rec)));
                else
                    task.addRecurrence(rec);
            });
        }
        if (dto.getNextDueDate() != null)
            task.setNextDueDate(dto.getNextDueDate());
        if (dto.getRecurrenceStartDate() != null) {
            if (task.getRecurrenceEndDate() != null) { // if end date was already given
                if (task.getRecurrenceEndDate().isBefore(dto.getRecurrenceStartDate())) // and is before start date then change end date to null
                    task.setRecurrenceEndDate(null);
            }
            task.setRecurrenceStartDate(dto.getRecurrenceStartDate());
        }
        if (dto.getRecurrenceEndDate() != null)
            task.setRecurrenceEndDate(dto.getRecurrenceEndDate());

        // Calculate next due date if something connected to recurrence has changed
        if (dto.getRecurrences() != null || dto.getRecurrenceStartDate() != null || dto.getRecurrenceEndDate() != null)
            task.setNextDueDate(calcNextDueDate(task));

        taskRepository.save(task);
        return convertToDTO(task);
    }
    // Remove a task's recurrence
    public TaskDTO removeRecurrence(Long taskId, TaskDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        List<Recurrence> recurrencesToBeRemoved = dto.getRecurrences();

        System.out.println(recurrencesToBeRemoved.size());
        for (Recurrence rec : recurrencesToBeRemoved) {
            task.removeRecurrence(rec);
        }
        task.setNextDueDate(calcNextDueDate(task));
        task.setRecurrenceStartDate(null);
        task.setRecurrenceEndDate(null);
        taskRepository.save(task);
        return convertToDTO(task);
    }
    // Remove a task's all recurrences
    public TaskDTO removeAllRecurrences(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setRecurrences(new ArrayList<>(List.of(Recurrence.NONE)));
        task.setNextDueDate(null);
        task.setRecurrenceStartDate(null);
        task.setRecurrenceEndDate(null);
        taskRepository.save(task);
        return convertToDTO(task);
    }

    // ----- DELETE -----
    // Delete task
    public void deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!task.getUser().getId().equals(userId))
            throw new IllegalArgumentException("You are not authorized to delete this task");
        taskRepository.delete(task);
    }
    // Delete tasks older than a certain date
    public void deleteOldTasks(LocalDate date, Long userId) {
        // currently only deletes tasks for a specific user, CAN CHANGE TO DELETE ALL TASKS
        List<Task> tasks = taskRepository.findTasksByDateBeforeAndUserIdEquals(date, userId);
        taskRepository.deleteAll(tasks);
    }

    // ----- Private helper methods -----
    // Model from DTO
    private Task buildTask(TaskDTO dto) {
        return Task.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .date(dto.getDate() != null ? dto.getDate() : LocalDate.now())
                .isCompleted(false)
                .isFavourite(dto.getIsFavourite())
                .isImportant(dto.getIsImportant())
                .recurrences(dto.getRecurrences() == null ? new ArrayList<>(List.of(Recurrence.NONE)) : dto.getRecurrences())
                .nextDueDate(calcNextDueDate(dto)) // null if not given (not recurring)
                .recurrenceStartDate(dto.getRecurrenceStartDate())
                .recurrenceEndDate(dto.getRecurrenceEndDate())
                .build();
    }

    // DTO from model
    private TaskDTO convertToDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .date(task.getDate())
                .isComplete(task.getIsCompleted())
                .isFavourite(task.getIsFavourite())
                .isImportant(task.getIsImportant())
                .recurrences(task.getRecurrences())
                .nextDueDate(task.getNextDueDate())
                .recurrenceStartDate(task.getRecurrenceStartDate())
                .recurrenceEndDate(task.getRecurrenceEndDate())
                .build();
    }

    // Calculate next due date for recurring tasks from recurrence
    private LocalDate calcNextDueDate(Task task) {
        return calcNextDueDate(convertToDTO(task));
    }
    private LocalDate calcNextDueDate(TaskDTO dto) {
        List<Recurrence> recurrences = dto.getRecurrences();
        LocalDate recurrenceStartDate = dto.getRecurrenceStartDate();
        LocalDate recurrenceEndDate = dto.getRecurrenceEndDate();
        LocalDate today = LocalDate.now();

        // If it is not an infinite recurrence
        if (recurrenceStartDate != null && recurrenceEndDate != null) {
        // Check if current date is within recurrence start and end dates
            if (today.isAfter(recurrenceEndDate))
                return null;
            if (today.isBefore(recurrenceStartDate))
                today = recurrenceStartDate.minusDays(1);
        }
        // If it is an infinite recurrence, but with start date defined
        else if (recurrenceStartDate != null) {
            if (today.isBefore(recurrenceStartDate))
                today = recurrenceStartDate.minusDays(1);
        }

        // Calculation of next due date
        LocalDate newDate = null;
        List<LocalDate> newDates = new ArrayList<>();
        for (Recurrence recurrence : recurrences) { // check for every recurrence type that has been set for the task
            switch (recurrence) {
                case DAILY:
                    newDates.add(today.plusDays(1));
                    break;
                case WEEKDAYS:
                    if (today.getDayOfWeek().getValue() < 5 || today.getDayOfWeek().getValue() == 7) // Mon-Thu or Sun
                        newDates.add(today.plusDays(1));
                    else
                        newDates.add(today.plusDays(8 - today.getDayOfWeek().getValue()));
                    break;
                case WEEKENDS:
                    if (today.getDayOfWeek().getValue() < 5) // Mon-Fri
                        newDates.add(today.plusDays(6 - today.getDayOfWeek().getValue()));
                    else if (today.getDayOfWeek().getValue() == 7) // Sun
                        newDates.add(today.plusDays(6));
                    else // Sat
                        newDates.add(today.plusDays(1));
                    break;
                case NONE:
                    newDates.add(null);
                    break;
                default: // specific day of the week
                    newDates.add(today.with(TemporalAdjusters.next(DayOfWeek.valueOf(recurrence.name()
                            .substring(0, recurrence.name().length()-1)))));
                    break;
            }
        }
        // choose the earliest date from the gathered new dates
        newDate = newDates.stream().filter(Objects::nonNull).min(LocalDate::compareTo).orElse(null);

        // If it is NONE, or the new date is after the recurrence end date, return null
        if (newDate == null)
            return null;
        if (recurrenceEndDate != null && newDate.isAfter(recurrenceEndDate))
            return null;

        return newDate;
    }
}
