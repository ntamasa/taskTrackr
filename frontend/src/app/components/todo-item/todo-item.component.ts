import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Todo from '../../models/todo';
import { WeekService } from '../../services/weekService';
import { MatDialog } from '@angular/material/dialog';
import { TodoMessageFormComponent } from '../todo-message-form/todo-message-form.component';
import { TodoMessageComponent } from '../todo-message/todo-message.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
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
  @Input() dayId: number = 0;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  isOpen: boolean = false;

  constructor(private weekService: WeekService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  toggleFavourite(): void {
    this.weekService.toggleFavourite(this.task.text);
  }

  deleteTask(): void {
    this.weekService.deleteTask(this.task.text, this.dayId);
  }

  finishTask(): void {
    this.weekService.finishTask(this.task.id, this.dayId);
  }

  duplicateTask(): void {
    this.isOpen = false;
    this.weekService.duplicateTask(this.task.id, this.dayId);
  }

  openMessageDialog(): void {
    this.dialog.open(TodoMessageComponent, { data: this.task });
  }

  openAddMessageDialog(): void {
    this.dialog.open(TodoMessageFormComponent, {
      data: { task: this.task, action: 'add-message' },
    });
  }

  openModifyDialog(): void {
    this.dialog.open(TodoMessageFormComponent, {
      data: { task: this.task, action: 'modify-task' },
    });
  }

  openCalendarDialog(): void {
    this.dialog.open(CalendarComponent, { data: this.task });
  }
}
