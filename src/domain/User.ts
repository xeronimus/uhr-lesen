import uuid from '../data/uuid';

export default interface User {
  id: string;
  name: string;
  points: number[]; // points per game
}

export function createNewUser(name: string): User {
  return {
    id: uuid(),
    name,
    points: [0, 0]
  };
}

export function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.points) &&
    obj.points.length === 2
  );
}
