import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: false,

  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements OnInit {
  readonly minDate = new Date(2025, 0, 1);

  selectedDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}

  onDateChange(event: any): void {
    this.selectedDate = event;
    this.dateChange.emit(event);
  }
}
