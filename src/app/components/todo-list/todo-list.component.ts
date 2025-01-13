import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Todo from '../../models/todo';
import { TaskService } from '../../services/taskService';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: false,

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit, OnDestroy {
  // @Input() todos: Todo[] = [];
  @Input() type: string = 'all';
  tasks: Todo[] = [];
  private sub!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sub = this.taskService.data$.subscribe((tasks) => {
      switch (this.type) {
        case 'important':
          this.tasks = tasks.filter((task) => task.isImportant);
          break;
        case 'non-important':
          this.tasks = tasks.filter((task) => !task.isImportant);
          break;
        case 'favourite':
          this.tasks = tasks.filter((task) => task.isFavourite);
          break;
        default:
          this.tasks = tasks;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
