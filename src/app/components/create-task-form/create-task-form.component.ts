import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/taskService';

@Component({
  selector: 'app-create-task-form',
  standalone: false,

  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css',
})
export class CreateTaskFormComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  importance: string = 'important';
  text: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.isOpen = false;
    this.taskService.addTask(this.text, this.importance);
  }

  handleCancel(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
