import { Component, OnDestroy, OnInit } from '@angular/core';
import Todo from '../../models/todo';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { WeekService } from '../../services/weekService';
import Week from '../../models/week';
import { getWeek } from '../../utils/getWeek';
import Day from '../../models/day';
import { CalendarComponent } from '../../components/calendar/calendar.component';

interface DayMessage {
  day: string;
  message: string;
}

@Component({
  selector: 'app-todos-page',
  standalone: false,

  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.css',
})
export class TodosPageComponent implements OnInit, OnDestroy {
  weeksHeading: DayMessage[] = [
    {
      day: 'Monday',
      message: 'Start your week fresh - let your tasks bloom with purpose.',
    },
    {
      day: 'Tuesday',
      message: 'Tend to your to-dos and watch your week take root.',
    },
    {
      day: 'Wednesday',
      message: 'Midweek magic—prune distractions and let your plans flourish.',
    },
    {
      day: 'Thursday',
      message: "Cultivate calm as you tackle today's garden of tasks.",
    },
    {
      day: 'Friday',
      message: 'Finish strong—your goals are in full bloom!',
    },
    {
      day: 'Saturday',
      message: 'Sow joy into your weekend and grow a productive day.',
    },
    {
      day: 'Sunday',
      message: 'Pause, reflect, and plant seeds for a beautiful week ahead.',
    },
  ];

  weeks: Week[] = [];
  private sub!: Subscription;

  currentDate: Date = new Date();
  currentWeek: Week = {} as Week;
  days: Day[] = [];

  currentDay: number = new Date().getDay() - 1;

  isCalendarOpen: boolean = false;

  constructor(private weekService: WeekService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.weekService.data$.subscribe((weeks) => {
      this.weeks = weeks;
      this.days = this.currentWeek.days;
    });

    // Set current week
    this.currentWeek =
      this.weeks.find(
        (week) =>
          week.id ===
          +`${this.currentDate.getFullYear()}${this.currentDate.getMonth()}${getWeek(
            this.currentDate
          )}`
      ) || ({} as Week);

    // Set days
    this.days = this.currentWeek.days;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog(dayIndex: number): void {
    this.dialog.open(CreateTaskFormComponent, { data: dayIndex });
  }

  openCalendarDialog(dayIndex: number): void {
    this.dialog.open(CalendarComponent, { data: dayIndex });
  }

  clearDay(day: Day): void {
    this.weekService.clearDay(day);
  }

  copyToNextDay(day: Day): void {
    this.weekService.copyTasksToNextDay(day);
  }
}
