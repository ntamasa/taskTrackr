import Day from './day';

export default interface Week {
  id: number;
  name: string;
  days: Day[];
  isDeafult: boolean;
}
