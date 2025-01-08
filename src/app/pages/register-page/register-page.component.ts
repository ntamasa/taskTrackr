import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {
  error: string = '';

  constructor() {}

  ngOnInit(): void {}
}
