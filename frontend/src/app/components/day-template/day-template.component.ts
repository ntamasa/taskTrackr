import { Component, Input, OnInit } from '@angular/core';
import Week from '../../models/week';
import Day from '../../models/day';

@Component({
  selector: 'app-day-template',
  standalone: false,
  templateUrl: './day-template.component.html',
  styleUrls: ['./day-template.component.scss'],
})
export class DayTemplateComponent implements OnInit {
  @Input() days: Day[] = [];

  isCreateMenuOpen: boolean = false;
  isCalendarOpen: boolean = false;
  selectedDay: Day | null = null; // Add this property

  constructor() {}

  ngOnInit() {}

  toggleCreateMenu(day: Day) {
    if (this.isCalendarOpen) this.selectedDay = day;
    else this.selectedDay = this.selectedDay === day ? null : day;

    this.isCreateMenuOpen = this.selectedDay !== null;
    this.isCalendarOpen ? (this.isCalendarOpen = false) : null;
  }

  toggleCalendarMenu(day: Day) {
    if (this.isCreateMenuOpen) this.selectedDay = day;
    else this.selectedDay = this.selectedDay === day ? null : day;

    this.isCalendarOpen = this.selectedDay !== null;
    this.isCreateMenuOpen ? (this.isCreateMenuOpen = false) : null;
  }
}
