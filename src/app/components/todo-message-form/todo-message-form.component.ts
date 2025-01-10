import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Todo from '../../pages/models/todo';

@Component({
  selector: 'app-todo-message-form',
  standalone: false,

  templateUrl: './todo-message-form.component.html',
  styleUrl: './todo-message-form.component.css',
})
export class TodoMessageFormComponent implements OnInit {
  @Input() todo: Todo = {
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

  constructor() {}

  ngOnInit(): void {}

  handleExit(): void {
    this.isEditing = false;
    this.isEditingChange.emit(this.isEditing);
  }
}
