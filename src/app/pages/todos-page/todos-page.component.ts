import { Component, OnDestroy, OnInit } from '@angular/core';
import Todo from '../../models/todo';
import { TaskService } from '../../services/taskService';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import { MatDialog } from '@angular/material/dialog';

interface DayMessage {
  day: string;
  message: string;
}

@Component({
  selector: 'app-todos-page',
  standalone: false,

  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.css',
})
export class TodosPageComponent implements OnInit, OnDestroy {
  weeks: DayMessage[] = [
    {
      day: 'Monday',
      message: 'Start your week fresh - let your tasks bloom with purpose.',
    },
    {
      day: 'Tuesday',
      message: 'Tend to your to-dos and watch your week take root.',
    },
    {
      day: 'Wednesday',
      message: 'Midweek magic—prune distractions and let your plans flourish.',
    },
    {
      day: 'Thursday',
      message: "Cultivate calm as you tackle today's garden of tasks.",
    },
    {
      day: 'Friday',
      message: 'Finish strong—your goals are in full bloom!',
    },
    {
      day: 'Saturday',
      message: 'Sow joy into your weekend and grow a productive day.',
    },
    {
      day: 'Sunday',
      message: 'Pause, reflect, and plant seeds for a beautiful week ahead.',
    },
  ];

  tasks: Todo[] = [];
  private sub!: Subscription;

  currentDay: number = 0;

  isCreateMenuOpen: boolean = false;
  isCalendarOpen: boolean = false;

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.sub = this.taskService.data$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(CreateTaskFormComponent);
  }

  clearDay(): void {
    this.taskService.clearTasks();
  }
}
