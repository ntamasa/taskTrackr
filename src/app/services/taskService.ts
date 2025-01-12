import { Injectable } from '@angular/core';
import Todo from '../models/todo';
import { mockTasks } from '../mockTasks';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Todo[] = mockTasks;
  private tasksSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    this.tasks
  );

  tasks$ = this.tasksSubject.asObservable();

  toggleFavourite(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, isFavourite: !task.isFavourite } : task
    );
    this.tasksSubject.next(this.tasks);
  }

  getTasks(): Todo[] {
    return this.tasks;
  }

  // getTasks() {
  //   return this.tasks.asObservable();
  //   this.tasks.asObservable().pipe(filter((tasks) => tasks));
  // }

  // getImportantTasks() {
  //   return this.tasks.getValue().filter((task) => task.isImportant);
  // }

  // getNonImportantTasks() {
  //   return this.tasks.getValue().filter((task) => !task.isImportant);
  // }

  // getFavouriteTasks() {
  //   return this.tasks.getValue().filter((task) => task.isFavourite);
  // }

  // addTask(task: Todo) {
  //   const currentTasks = this.tasks.getValue();
  //   this.tasks.next([...currentTasks, task]);
  // }

  // removeTask(id: number) {
  //   const currentTasks = this.tasks.getValue();
  //   this.tasks.next(currentTasks.filter((task) => task.id !== id));
  // }

  // toggleFavourite(id: number) {
  //   const currentTasks = this.tasks.getValue();
  //   this.tasks.next(
  //     currentTasks.map((task) =>
  //       task.id === id ? { ...task, isFavourite: !task.isFavourite } : task
  //     )
  //   );
  // }

  // addMessage(id: number, message: string) {
  //   const currentTasks = this.tasks.getValue();
  //   this.tasks.next(
  //     currentTasks.map((task) => (task.id === id ? { ...task, message } : task))
  //   );
  // }
}
