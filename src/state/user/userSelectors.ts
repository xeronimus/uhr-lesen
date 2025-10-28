import {createSelector} from 'reselect';

import {UserState} from './UserState';

const _user = (state: UserState) => state.user;

export const selectUserOrThrow = createSelector([_user], (user) => {
  if (!user) {
    throw new Error('no user in state');
  }

  return {...user};
});
