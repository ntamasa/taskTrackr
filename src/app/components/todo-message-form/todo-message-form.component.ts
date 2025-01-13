import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Todo from '../../models/todo';
import { FormControl } from '@angular/forms';
import { TaskService } from '../../services/taskService';

@Component({
  selector: 'app-todo-message-form',
  standalone: false,

  templateUrl: './todo-message-form.component.html',
  styleUrl: './todo-message-form.component.css',
})
export class TodoMessageFormComponent implements OnInit {
  @Input() task: Todo = {
    id: 0,
    text: '',
    done: false,
    isImportant: false,
    isFavourite: false,
    message: '',
  };
  @Input() isEditing: boolean = false;
  @Output() isEditingChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  message: string = this.task.message;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.message = this.task.message;
  }

  handleSubmit(): void {
    this.isEditing = false;
    this.taskService.updateMessage(this.task.id, this.message);
  }

  handleCancel(): void {
    this.isEditing = false;
    this.isEditingChange.emit(this.isEditing);
  }
}
