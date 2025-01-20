import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: false,

  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent implements OnInit {
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.buttonClick.emit();
  }
}
