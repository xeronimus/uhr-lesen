import uuid from '../data/uuid';

export default interface User {
  id: string;
  name: string;
}

export function createNewUser(name: string): User {
  return {
    id: uuid(),
    name
  };
}
