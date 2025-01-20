import { identity } from 'rxjs';
import Week from './models/week';

export const mockWeekTemplate: Week = {
  id: 202504,
  name: 'Default week',
  days: [
    {
      id: 1,
      name: 'Monday',
      tasks: [],
    },
    {
      id: 2,
      name: 'Tuesday',
      tasks: [],
    },
    {
      id: 3,
      name: 'Wednesday',
      tasks: [],
    },
    {
      id: 4,
      name: 'Thursday',
      tasks: [],
    },
    {
      id: 5,
      name: 'Friday',
      tasks: [
        {
          id: 1234,
          text: 'Do the thing',
          done: false,
          isImportant: false,
          isFavourite: false,
          message: '',
        },
      ],
    },
    {
      id: 6,
      name: 'Saturday',
      tasks: [],
    },
    {
      id: 7,
      name: 'Sunday',
      tasks: [],
    },
  ],
  isDefault: true,
};
