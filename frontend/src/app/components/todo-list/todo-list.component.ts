import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Todo from '../../models/todo';
import { Observable, Subscription } from 'rxjs';
import { WeekService } from '../../services/weekService';
import Week from '../../models/week';
import { getWeek } from '../../utils/getWeek';

@Component({
  selector: 'app-todo-list',
  standalone: false,

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit, OnDestroy {
  // @Input() todos: Todo[] = [];
  @Input() type: string = 'all';
  @Input() dayId: number = 0;
  tasks: Todo[] = [];
  private sub!: Subscription;

  currentWeek: Week = {} as Week;
  currentDate: Date = new Date();
  shownWeek: Week = {} as Week;

  constructor(private weekService: WeekService) {}

  ngOnInit(): void {
    this.sub = this.weekService.combinedData$.subscribe(
      ({ weeks, shownWeek }) => {
        // this.shownWeek = weeks.find((week) => week.id === shownWeekId)!;
        if (!shownWeek) return;

        let day;
        switch (this.type) {
          // Important tasks of current day
          case 'important':
            day = shownWeek.days.find((day) => day.id === this.dayId);
            if (day) this.tasks = day.tasks.filter((task) => task.isImportant);
            break;

          // Non-important tasks of current day
          case 'non-important':
            day = shownWeek.days.find((day) => day.id === this.dayId);
            if (day) this.tasks = day.tasks.filter((task) => !task.isImportant);
            break;

          // Favourite tasks of the whole database
          case 'favourite':
            const favouriteTasks = weeks.reduce((acc, week) => {
              week.days.forEach((day) => {
                acc.push(...day.tasks.filter((task) => task.isFavourite));
              });
              return acc;
            }, [] as Todo[]);

            // Remove duplicates
            this.tasks = favouriteTasks.filter(
              (task, index, self) =>
                index === self.findIndex((t) => t.text === task.text)
            );
            break;

          // All tasks of the current day
          default:
            this.tasks = shownWeek.days[new Date().getDay() - 1].tasks;
            break;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  trackByTaskId(index: number, task: Todo): number {
    return task.id;
  }
}
