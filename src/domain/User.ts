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

export function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.totalPoints === 'number'
  );
}
