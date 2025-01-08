import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-message',
  standalone: false,

  templateUrl: './todo-message.component.html',
  styleUrl: './todo-message.component.css',
})
export class TodoMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
