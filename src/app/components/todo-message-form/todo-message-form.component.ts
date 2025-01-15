import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import Todo from '../../models/todo';
import { FormControl } from '@angular/forms';
import { WeekService } from '../../services/weekService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-message-form',
  standalone: false,

  templateUrl: './todo-message-form.component.html',
  styleUrl: './todo-message-form.component.css',
})
export class TodoMessageFormComponent implements OnInit {
  task: Todo = {
    id: 0,
    text: '',
    done: false,
    isImportant: false,
    isFavourite: false,
    message: '',
  };

  message: string = this.task.message;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.task = this.data;
    this.message = this.task.message;
  }

  handleSubmit(): void {
    // this.taskService.updateMessage(this.task.id, this.message);
  }

  handleCancel(): void {}
}
