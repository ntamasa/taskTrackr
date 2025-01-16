import { Component, OnInit, Output } from '@angular/core';
import Todo from '../../models/todo';
import Day from '../../models/day';
import { Observable } from 'rxjs';
import Week from '../../models/week';

@Component({
  selector: 'app-favourites',
  standalone: false,

  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  days: Day[] = [
    {
      id: 1,
      name: 'Default day',
      tasks: [
        {
          id: 1,
          text: 'mosogass el',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
        {
          id: 2,
          text: 'főzz',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
        {
          id: 3,
          text: 'kutya sétáltatás',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
        {
          id: 4,
          text: 'edzés',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
      ],
    },
    {
      id: 1,
      name: 'Weekend',
      tasks: [
        {
          id: 1,
          text: 'randi az asszonnyal',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
        {
          id: 2,
          text: '1 óra séta pluszban',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
        {
          id: 3,
          text: 'kutya sétáltatás',
          done: false,
          isImportant: true,
          isFavourite: true,
          message: '',
        },
      ],
    },
  ];
  filteredDays: Day[] = this.days;

  weeks: Week[] = [
    {
      id: 1,
      name: 'Default week',
      days: [
        {
          id: 1,
          name: 'Monday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 2,
          name: 'Tuesday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 3,
          name: 'Wednesday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 4,
          name: 'Thursday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 5,
          name: 'Friday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 6,
          name: 'Saturday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 7,
          name: 'Sunday',
          tasks: [
            {
              id: 1,
              text: 'mosogass el',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 2,
              text: 'főzz',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 3,
              text: 'kutya sétáltatás',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
            {
              id: 4,
              text: 'edzés',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
      ],
      isDefault: true,
    },
    {
      id: 1,
      name: 'Holidays weeks',
      days: [
        {
          id: 1,
          name: 'Monday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 2,
          name: 'Tuesday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 3,
          name: 'Wednesday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 4,
          name: 'Thursday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 5,
          name: 'Friday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 6,
          name: 'Saturday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
        {
          id: 7,
          name: 'Sunday',
          tasks: [
            {
              id: 1,
              text: 'ne rugj be pls',
              done: false,
              isImportant: true,
              isFavourite: true,
              message: '',
            },
          ],
        },
      ],
      isDefault: false,
    },
  ];
  filteredWeeks: Week[] = this.weeks;

  isCreateMenuOpen: boolean = false;
  isCalendarOpen: boolean = false;

  constructor() {}

  ngOnInit() {}
}
