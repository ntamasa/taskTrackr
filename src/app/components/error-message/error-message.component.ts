import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,

  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
