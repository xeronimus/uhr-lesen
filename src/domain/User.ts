import uuid from '../data/uuid';

export default interface User {
  id: string;
  name: string;
  totalPoints: number;
}

export function createNewUser(name: string): User {
  return {
    id: uuid(),
    name,
    totalPoints: 0
  };
}
