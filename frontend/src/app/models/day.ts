import Todo from './todo';

export default interface Day {
  id: number;
  name: string;
  tasks: Todo[];
}
