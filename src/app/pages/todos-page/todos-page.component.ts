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
  styleUrl: './todos-page.component.scss',
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
  shownWeek: Week = {} as Week;
  days: Day[] = [];

  currentDay: number = new Date().getDay() - 1;

  isCalendarOpen: boolean = false;

  constructor(private weekService: WeekService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.weekService.combinedData$.subscribe(
      ({ weeks, shownWeek }) => {
        this.weeks = weeks;
        this.shownWeek = shownWeek!;
        this.days = this.shownWeek.days;
        console.log(this.shownWeek);
      }
    );

    // Set current week
    this.currentWeek = this.weekService.getCurrentWeek;
    this.shownWeek = this.currentWeek;

    // Set days
    this.days = this.shownWeek.days;
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

  showCurrentWeek(): void {
    this.shownWeek = this.currentWeek;
    this.weekService.updateShownWeek(this.currentWeek);
  }

  onDateChange(selectedDate: Date | null): void {
    if (!selectedDate) return;

    // get selected week's id
    const selectedWeekId =
      +`${selectedDate.getFullYear()}${selectedDate.getMonth()}${getWeek(
        selectedDate
      )}`;

    // find selected week
    const selectedWeek = this.weeks.find((week) => week.id === selectedWeekId);

    // week already exists -> show week
    if (selectedWeek)
      this.shownWeek = this.weeks.find((week) => week.id === selectedWeekId)!;
    // week doesn't exist -> create new week, show newly created week
    else this.shownWeek = this.weekService.createWeek(selectedDate);

    this.weekService.updateShownWeek(selectedWeek!);
  }

  trackByDayName(index: number, day: Day): string {
    return day.name;
  }
}
