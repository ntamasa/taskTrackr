import { getWeek } from './getWeek';

export const createWeekId = (date: Date): number => {
  return +`${date.getFullYear()}${date.getMonth()}${getWeek(date)}`;
};
