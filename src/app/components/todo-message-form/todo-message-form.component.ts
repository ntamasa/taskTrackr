import { Component, Inject, OnInit } from '@angular/core';
import Todo from '../../models/todo';
import { WeekService } from '../../services/weekService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-message-form',
  standalone: false,

  templateUrl: './todo-message-form.component.html',
  styleUrl: './todo-message-form.component.scss',
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
  importance: string = this.task.isImportant ? 'important' : 'other';

  action: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weekService: WeekService
  ) {}

  ngOnInit(): void {
    this.task = this.data.task;
    this.action = this.data.action;

    if (this.action === 'add-message') this.message = this.task.message;
    else {
      this.importance = this.task.isImportant ? 'important' : 'other';
      this.message = this.task.text;
    }
  }

  handleSubmit(): void {
    this.weekService.updateMessage(this.task.id, this.message);
  }

  handleCancel(): void {}
}
