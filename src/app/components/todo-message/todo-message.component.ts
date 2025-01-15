import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-message',
  standalone: false,

  templateUrl: './todo-message.component.html',
  styleUrl: './todo-message.component.css',
})
export class TodoMessageComponent implements OnInit {
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.message = this.data.message;
  }
}
