import { Component, inject, Inject, OnInit } from '@angular/core';
import { WeekService } from '../../services/weekService';
import Todo from '../../models/todo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task-form',
  standalone: false,

  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent implements OnInit {
  importance: string = 'important';
  text: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
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

    // Open snackbar to inform user the task was added
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    this._snackBar.open('Task added!', 'Close', {
      duration: 3000,
    });
  }

  handleCancel(): void {}
}
