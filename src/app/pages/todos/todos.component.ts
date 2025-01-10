import { Component, OnInit } from '@angular/core';
import Todo from '../models/todo';

interface DayMessage {
  day: string;
  message: string;
}

@Component({
  selector: 'app-todos',
  standalone: false,

  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  weeks: DayMessage[] = [
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
  todos: Todo[] = [
    {
      id: 1,
      text: 'continue working on the project',
      done: false,
      isImportant: true,
      isFavourite: true,
      message: 'ezt mindenképp meg kell csináld',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: true,
      isFavourite: true,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: true,
      isFavourite: false,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: true,
      isImportant: true,
      isFavourite: false,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: false,
      message: 'hihi',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: true,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: false,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: false,
      message: '',
    },
  ];

  currentDay: number = 0;
  importantTodos: Todo[] = this.todos.filter((todo) => todo.isImportant);
  otherTodos: Todo[] = this.todos.filter((todo) => !todo.isImportant);

  isCreateMenuOpen: boolean = false;
  isCalendarOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.currentDay = new Date().getDay() - 1;
  }
}
