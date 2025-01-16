import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Week from '../models/week';
import { mockWeeks } from '../mockWeeks';
import Day from '../models/day';
import { getWeek } from '../utils/getWeek';
import Todo from '../models/todo';

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

  duplicateTask(id: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days.find(
      (day) => day.id === new Date().getDay()
    ) as Day;

    const taskToDuplicate = currentDay.tasks.find((task) => task.id === id);

    if (taskToDuplicate) {
      const updatedTasks = [...currentDay.tasks, { ...taskToDuplicate }];
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

  addTask(task: Todo): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days.find(
      (day) => day.id === new Date().getDay()
    ) as Day;

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

  deleteTask(id: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay = currentWeek.days.find(
      (day) => day.id === new Date().getDay()
    ) as Day;

    const updatedTasks = currentDay.tasks.filter((task) => task.id !== id);
    console.log(updatedTasks);

    const updatedDays: Day[] = currentWeek.days.map((day) =>
      day === currentDay ? { ...day, tasks: updatedTasks } : day
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
}
