import { Injectable, ɵgetUnknownPropertyStrictMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Week from '../models/week';
import { mockWeeks } from '../mockWeeks';
import Day from '../models/day';
import { getWeek } from '../utils/getWeek';
import Todo from '../models/todo';
import { WeekDay } from '@angular/common';
import { CdkAriaLive } from '@angular/cdk/a11y';

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

@Injectable({ providedIn: 'root' })
export class WeekService {
  private weeks: BehaviorSubject<Week[]> = new BehaviorSubject<Week[]>(
    [] as Week[]
  );
  data$ = this.weeks.asObservable();

  constructor() {
    this.weeks.next(mockWeeks);
  }

  toggleFavourite(text: string): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();

    const updatedDays = currentWeek.days.map((day) => {
      const updatedTasks = day.tasks.map((task) =>
        task.text === text ? { ...task, isFavourite: !task.isFavourite } : task
      );
      return { ...day, tasks: updatedTasks };
    });

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );

    this.weeks.next(updatedWeeks);
  }

  updateMessage(id: number, message: string): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();

    const updatedDays = currentWeek.days.map((day) => {
      const updatedTasks = day.tasks.map((task) =>
        task.id === id ? { ...task, message } : task
      );
      return { ...day, tasks: updatedTasks };
    });

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );

    this.weeks.next(updatedWeeks);
  }

  duplicateTask(id: number, dayId: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days.find((day) => day.id === dayId) as Day;

    const taskToDuplicate = currentDay.tasks.find((task) => task.id === id);

    if (taskToDuplicate) {
      const updatedTasks = [
        ...currentDay.tasks,
        { ...taskToDuplicate, text: taskToDuplicate.text + ' (copy)' },
      ];
      const updatedDays: Day[] = currentWeek.days.map((day) =>
        day === currentDay ? { ...day, tasks: updatedTasks } : day
      );

      const updatedWeek = { ...currentWeek, days: updatedDays };
      const updatedWeeks = currentWeeks.map((week) =>
        week.id === updatedWeek.id ? updatedWeek : week
      );

      this.weeks.next(updatedWeeks);
    }
  }

  copyTaskToDate(selected: Date, data: any): void {
    // check if week already exists
    const selectedWeek = this.getWeek(selected);

    // true -> add task to the selected week
    if (selectedWeek) {
      const updatedDays = selectedWeek.days.map((day) =>
        day.id === (selected.getDay() === 0 ? 7 : selected.getDay()) &&
        !day.tasks.some((task) => task.text === data.text)
          ? {
              ...day,
              tasks: [...day.tasks, { ...data, id: new Date().getTime() }],
            }
          : day
      );

      const updatedWeek = { ...selectedWeek, days: updatedDays };
      const updatedWeeks = this.weeks
        .getValue()
        .map((week) => (week.id === updatedWeek.id ? updatedWeek : week));

      this.weeks.next(updatedWeeks);

      // false -> create new week and add task to the selected day
    } else {
      const updatedTasks = [{ ...data, id: new Date().getTime() }];

      const updatedDays = WEEKDAYS.map((day, i) => ({
        id: i + 1,
        name: day,
        tasks: i === selected.getDay() - 1 ? updatedTasks : [],
      }));

      const newWeek = {
        id: +`${selected.getFullYear()}${selected.getMonth()}${getWeek(
          selected
        )}`,
        name: [selected.getFullYear(), getWeek(selected)].join('-'),
        days: updatedDays,
        isDefault: false,
      } as Week;
      const updatedWeeks = [...this.weeks.getValue(), newWeek];
      console.log(updatedWeeks);

      this.weeks.next(updatedWeeks);
    }
  }

  addTask(task: Todo, dayIndex: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days[dayIndex];

    const updatedTasks = [...currentDay.tasks, task];
    const updatedDays: Day[] = currentWeek.days.map((day) =>
      day === currentDay ? { ...day, tasks: updatedTasks } : day
    );

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );
    this.weeks.next(updatedWeeks);
  }

  deleteTask(text: string, dayId: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days.find((day) => day.id === dayId) as Day;

    const updatedTasks = currentDay.tasks.filter((task) => task.text !== text);

    const updatedDays: Day[] = currentWeek.days.map((day) =>
      day === currentDay ? { ...day, tasks: updatedTasks } : day
    );

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );

    this.weeks.next(updatedWeeks);
  }

  clearDay(currentDay: Day): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();

    const updatedDays = currentWeek.days.map((day) =>
      day.id === currentDay.id ? { ...currentDay, tasks: [] } : day
    );
    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );

    this.weeks.next(updatedWeeks);
  }

  copyTasksToNextDay(day: Day): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDayIndex = currentWeek.days.findIndex(
      (currentDay) => currentDay.id === day.id
    );

    const nextDayIndex = currentDayIndex === 6 ? 0 : currentDayIndex + 1;
    const nextDay = currentWeek.days[nextDayIndex];

    const updatedTasks = [...nextDay.tasks, ...day.tasks];
    const updatedDays = currentWeek.days.map((currentDay) =>
      currentDay === nextDay
        ? { ...currentDay, tasks: updatedTasks }
        : currentDay
    );

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week.id === updatedWeek.id ? updatedWeek : week
    );

    this.weeks.next(updatedWeeks);
  }

  getCurrentWeek(): Week {
    return this.weeks
      .getValue()
      .find(
        (week) =>
          week.id ===
          +`${new Date().getFullYear()}${new Date().getMonth()}${getWeek(
            new Date()
          )}`
      ) as Week;
  }

  getWeek(date: Date): Week {
    return this.weeks
      .getValue()
      .find(
        (week) =>
          week.id === +`${date.getFullYear()}${date.getMonth()}${getWeek(date)}`
      ) as Week;
  }
}
