import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeekService } from '../../services/weekService';
import Todo from '../../models/todo';

@Component({
  selector: 'app-create-task-form',
  standalone: false,

  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css',
})
export class CreateTaskFormComponent implements OnInit {
  importance: string = 'important';
  text: string = '';

  constructor(private weekService: WeekService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.weekService.addTask({
      id: new Date().getTime(),
      text: this.text,
      done: false,
      isImportant: this.importance === 'important',
      isFavourite: false,
      message: '',
    } as Todo);
  }

  handleCancel(): void {}
}
