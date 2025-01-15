import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Todo from '../../models/todo';
import { WeekService } from '../../services/weekService';
import { MatDialog } from '@angular/material/dialog';
import { TodoMessageFormComponent } from '../todo-message-form/todo-message-form.component';
import { TodoMessageComponent } from '../todo-message/todo-message.component';

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

  constructor(private weekService: WeekService, public dialog: MatDialog) {}

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

  openMessageDialog(): void {
    this.dialog.open(TodoMessageComponent, { data: this.task });
  }

  openModifyDialog(): void {
    this.dialog.open(TodoMessageFormComponent, { data: this.task });
  }
}
