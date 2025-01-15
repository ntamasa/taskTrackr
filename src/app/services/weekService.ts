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

  toggleFavourite(id: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek();
    const currentDay: Day =
      currentWeek.days.find((day) =>
        day.tasks.find((task) => task.id === id)
      ) || ({} as Day);

    const updatedTasks = currentDay.tasks.map((task) =>
      task.id === id ? { ...task, isFavourite: !task.isFavourite } : task
    );

    const updatedDays = currentWeek.days.map((day) =>
      day === currentDay ? { ...day, tasks: updatedTasks } : day
    );

    const updatedWeek = { ...currentWeek, days: updatedDays };
    const updatedWeeks = currentWeeks.map((week) =>
      week === currentWeek ? updatedWeek : week
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
