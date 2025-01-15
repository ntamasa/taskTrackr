import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Day from '../models/day';
import Todo from '../models/todo';
import { WeekService } from './weekService';

@Injectable({ providedIn: 'root' })
export class DayService {
  private days: BehaviorSubject<Day[]> = new BehaviorSubject<Day[]>(
    [] as Day[]
  );
  data$ = this.days.asObservable();

  constructor(private weekService: WeekService) {
    this.days.next(this.weekService.getCurrentWeek().days);
  }

  toggleFavourite(tasks: Todo[]): void {
    const currentDays = this.days.getValue();
    const newDays = currentDays.map((day) => {
      return {
        ...day,
        tasks,
      };
    });
    console.log(currentDays, newDays);
    // this.weekService.toggleFavourite(newDays);
    this.days.next(newDays);
  }
}
