import {createSelector} from 'reselect';

import User from '../../domain/User';
import {UserState} from './UserState';

const _user = (state: UserState) => state.user;

export const selectUserOrThrow: (state: UserState) => User = createSelector([_user], (user) => {
  if (!user) {
    throw new Error('no user in state');
  }

  return {...user};
});

export const selectTotalPoints: (state: UserState) => number = createSelector([selectUserOrThrow], (user) =>
  user.points.reduce((sum, curr) => {
    sum = sum + curr;
    return sum;
  }, 0)
);
