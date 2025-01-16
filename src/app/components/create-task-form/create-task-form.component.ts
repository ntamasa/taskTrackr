import { Component, Inject, OnInit } from '@angular/core';
import { WeekService } from '../../services/weekService';
import Todo from '../../models/todo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-form',
  standalone: false,

  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css',
})
export class CreateTaskFormComponent implements OnInit {
  importance: string = 'important';
  text: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weekService: WeekService
  ) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.weekService.addTask(
      {
        id: new Date().getTime(),
        text: this.text,
        done: false,
        isImportant: this.importance === 'important',
        isFavourite: false,
        message: '',
      } as Todo,
      this.data
    );
  }

  handleCancel(): void {}
}
