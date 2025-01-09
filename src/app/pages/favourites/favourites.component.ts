import { Component, OnInit } from '@angular/core';
import Todo from '../../todo';

@Component({
  selector: 'app-favourites',
  standalone: false,

  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  weekdays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  favourites: Todo[] = [
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
      isFavourite: true,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: true,
      isImportant: true,
      isFavourite: true,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: true,
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
      isFavourite: true,
      message: '',
    },
    {
      id: 1,
      text: 'mosogass el',
      done: false,
      isImportant: false,
      isFavourite: true,
      message: '',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
