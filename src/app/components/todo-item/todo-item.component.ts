import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Todo from '../../todo';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {
    id: 0,
    text: '',
    done: false,
    isImportant: false,
    isFavourite: false,
    message: '',
  };

  isOpen: boolean = false;
  isMessageShown: boolean = false;
  isMessageEditing: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleClick(message: string): void {
    console.log(message);
  }
}
