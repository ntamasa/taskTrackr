import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeekService } from '../../services/weekService';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  selected: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: void,
    private weekService: WeekService
  ) {}

  ngOnInit(): void {
    this.selected = new Date();
  }

  handleSubmit(): void {
    // check for data type
    if (typeof this.data === 'object')
      this.weekService.copyTaskToDate(this.selected, this.data);
    else this.weekService.copyDayToDate(this.selected, this.data);
  }
}
