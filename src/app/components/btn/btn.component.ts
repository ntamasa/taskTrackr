import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: false,

  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent implements OnInit {
  @Input() action: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.action();
  }
}
