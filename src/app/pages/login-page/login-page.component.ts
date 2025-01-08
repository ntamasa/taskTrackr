import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  error: string = '';

  constructor() {}

  ngOnInit(): void {}
}
