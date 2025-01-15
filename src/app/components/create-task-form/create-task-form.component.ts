import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeekService } from '../../services/weekService';

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
    // this.weekService.(this.text, this.importance);
  }

  handleCancel(): void {}
}
