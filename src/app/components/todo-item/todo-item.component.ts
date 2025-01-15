import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Todo from '../../models/todo';
import { TaskService } from '../../services/taskService';
import { WeekService } from '../../services/weekService';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() task: Todo = {
    id: 0,
    text: '',
    done: false,
    isImportant: false,
    isFavourite: false,
    message: '',
  };

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  isOpen: boolean = false;
  isMessageShown: boolean = false;
  isMessageEditing: boolean = false;

  constructor(private weekService: WeekService) {}

  ngOnInit(): void {}

  toggleFavourite(): void {
    this.weekService.toggleFavourite(this.task.id);
  }

  deleteTask(): void {
    // this.taskService.deleteTask(this.task.id);
  }

  finishTask(): void {
    // this.taskService.finishTask(this.task.id);
  }

  duplicateTask(): void {
    this.isOpen = false;
    // this.taskService.duplicateTask(this.task.id);
  }
}
