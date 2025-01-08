import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-form',
  standalone: false,

  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css',
})
export class CreateTaskFormComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleExit(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
