import User from '../../domain/User';
import {AppStoreSetter} from '../store';

export interface UserActions {
  setUser: (user: User) => void;
}

export const getUserActions = (set: AppStoreSetter): UserActions => {
  return {
    setUser: (user) => set({user}, undefined, 'user/setUser')
  };
};
