import { Injectable } from '@angular/core';
import Todo from '../models/todo';
import { mockTasks } from '../mockTasks';
import { BehaviorSubject, filter } from 'rxjs';
import { DayService } from './dayService';
import { WeekService } from './weekService';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    [] as Todo[]
  );
  data$ = this.tasks.asObservable();

  constructor(
    private dayService: DayService,
    private weekService: WeekService
  ) {
    this.tasks.next(
      this.weekService.getCurrentWeek().days[new Date().getDay()].tasks
    );
  }

  toggleFavourite(id: number): void {
    const currentTasks = this.tasks.getValue();
    const newTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, isFavourite: !task.isFavourite } : task
    );
    this.dayService.toggleFavourite(newTasks);
    this.tasks.next(newTasks);
    console.log(newTasks, currentTasks);
  }

  addTask(text: string, importance: string): void {
    const currentTasks = this.tasks.getValue();

    if (currentTasks.find((task) => task.text === text)) return;

    const newTask: Todo = {
      id: Date.now(),
      text,
      done: false,
      isImportant: importance === 'important',
      isFavourite: false,
      message: '',
    };
    this.tasks.next([...currentTasks, newTask]);
  }

  deleteTask(id: number): void {
    const currentTasks = this.tasks.getValue();
    this.tasks.next(currentTasks.filter((task) => task.id !== id));
  }

  updateMessage(id: number, message: string) {
    const currentTasks = this.tasks.getValue();
    this.tasks.next(
      currentTasks.map((task) => (task.id === id ? { ...task, message } : task))
    );
  }

  finishTask(id: number) {
    const currentTasks = this.tasks.getValue();
    this.tasks.next(
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  duplicateTask(id: number): void {
    const currentTasks = this.tasks.getValue();
    const taskToDuplicate = currentTasks.find((task) => task.id === id);
    if (taskToDuplicate) {
      this.tasks.next([
        ...currentTasks,
        { ...taskToDuplicate, id: Date.now(), done: false },
      ]);
    }
  }

  clearTasks(): void {
    this.tasks.next([]);
  }
}
