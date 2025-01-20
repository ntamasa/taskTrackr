import { Injectable, ɵgetUnknownPropertyStrictMode } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import Week from '../models/week';
import { mockWeeks } from '../mockWeeks';
import Day from '../models/day';
import { getWeek } from '../utils/getWeek';
import Todo from '../models/todo';
import { WeekDay } from '@angular/common';
import { CdkAriaLive } from '@angular/cdk/a11y';
import { mockWeekTemplate } from '../mockWeekTemp';

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
  private shownWeekId: BehaviorSubject<number> = new BehaviorSubject<number>(
    +`${new Date().getFullYear()}${new Date().getMonth()}${getWeek(new Date())}`
  );

  data$ = combineLatest([this.weeks, this.shownWeekId]).pipe(
    map(([weeks, shownWeekId]) => ({
      weeks,
      shownWeekId,
    }))
  );

  constructor() {
    this.weeks.next(mockWeeks);
    this.shownWeekId.next(this.getCurrentWeek.id);
  }

  toggleFavourite(text: string): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek;

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
    const currentWeek = this.getCurrentWeek;

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

  updateTask(id: number, text: string, importance: boolean): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek;

    const updatedDays = currentWeek.days.map((day) => {
      const updatedTasks = day.tasks.map((task) =>
        task.id === id ? { ...task, text, isImportant: importance } : task
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
    const currentWeek = this.getCurrentWeek;
    const currentDay = currentWeek.days.find((day) => day.id === dayId) as Day;

    const taskToDuplicate = currentDay.tasks.find((task) => task.id === id);

    if (taskToDuplicate) {
      const updatedTasks = [
        ...currentDay.tasks,
        {
          ...taskToDuplicate,
          text: taskToDuplicate.text + ' (copy)',
          id: new Date().getTime(),
        },
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

  copyDayToDate(selected: Date, dayIndex: any): void {
    // check if selected week already exists
    const selectedWeek = this.getWeek(selected);

    const currentWeek = this.getCurrentWeek;
    const currentTasks = currentWeek.days[dayIndex].tasks;
    const currentTaskNames = currentTasks.map((task) => task.text);

    // true -> get targeted week and add current to the already existing tasks
    if (selectedWeek) {
      const updatedDays = selectedWeek.days.map((day) =>
        day.id === (selected.getDay() === 0 ? 7 : selected.getDay())
          ? {
              ...day,
              tasks: [
                ...day.tasks.filter(
                  (task) => !currentTaskNames.includes(task.text)
                ),
                ...currentTasks,
              ],
            }
          : day
      );

      const updatedWeek = { ...selectedWeek, days: updatedDays };
      const updatedWeeks = this.weeks
        .getValue()
        .map((week) => (week.id === updatedWeek.id ? updatedWeek : week));

      this.weeks.next(updatedWeeks);

      // false -> create new week with empty days and tasks, and paste current tasks to selected day
    } else {
      const updatedDays = WEEKDAYS.map((day, i) => ({
        id: i + 1,
        name: day,
        tasks: i === selected.getDay() - 1 ? currentTasks : [],
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

      this.weeks.next(updatedWeeks);
    }
  }

  addTask(task: Todo, dayIndex: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek;
    const currentDay = currentWeek.days[dayIndex];

    const updatedTasks = [...currentDay.tasks, task];
    const updatedDays: Day[] = currentWeek.days.map((day) =>
      day === currentDay ? { ...day, tasks: updatedTasks } : day
    );

    const updatedWeek = { ...currentWeek, days: updatedDays };

    let updatedWeeks: Week[] = [];
    if (currentWeeks.find((week) => week.id === updatedWeek.id)) {
      updatedWeeks = currentWeeks.map((week) =>
        week.id === updatedWeek.id ? updatedWeek : week
      );
    } else {
      updatedWeeks = [...currentWeeks, updatedWeek];
    }
    this.weeks.next(updatedWeeks);
    this.shownWeekId.next(updatedWeek.id);
  }

  finishTask(taskId: number, dayIndex: number): void {
    const currentWeeks = this.weeks.getValue();
    const currentWeek = this.getCurrentWeek;
    const currentDay = currentWeek.days[dayIndex];

    const updatedTasks = currentDay.tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );

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
    const currentWeek = this.getCurrentWeek;
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
    const currentWeek = this.getCurrentWeek;

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
    const currentWeek = this.getCurrentWeek;
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

  createWeek(date: Date): Week {
    const newWeek = {
      ...mockWeekTemplate,
      id: +`${date.getFullYear()}${date.getMonth()}${getWeek(date)}`,
    };

    this.weeks.next([...this.weeks.getValue(), newWeek]);

    return {
      ...mockWeekTemplate,
      id: +`${date.getFullYear()}${date.getMonth()}${getWeek(date)}`,
    };
  }

  get getCurrentWeek(): Week {
    const currentWeekId =
      +`${new Date().getFullYear()}${new Date().getMonth()}${getWeek(
        new Date()
      )}`;
    return (
      (this.weeks
        .getValue()
        .find((week) => week.id === currentWeekId) as Week) ||
      this.createWeek(new Date())
    );
  }

  get getShownWeek(): number {
    return this.shownWeekId.getValue();
  }

  updateShownWeek(week: Week): void {
    this.shownWeekId.next(week.id);
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
