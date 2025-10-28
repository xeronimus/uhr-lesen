import User from '../../domain/User';

export interface UserState {
  user?: User;
}

export const getDefaultUserState = (): UserState => {
  return {
    user: undefined
  };
};
