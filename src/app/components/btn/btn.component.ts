import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: false,

  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.buttonClick.emit();
  }
}
