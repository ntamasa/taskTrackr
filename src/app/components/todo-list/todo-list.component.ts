import { Component, Input, OnInit } from '@angular/core';
import Todo from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: false,

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];

  constructor() {}

  ngOnInit(): void {}
}
