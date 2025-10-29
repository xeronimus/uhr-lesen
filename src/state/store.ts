import {create} from 'zustand';
import {combine, devtools} from 'zustand/middleware';

import {isAnalogClockConfig} from '../domain/AnalogClockConfig';
import {isUser} from '../domain/User';
import envConfig from '../envConfig';
import {logger} from './loggerMiddleware';
import {UiActions, getUiActions} from './ui/UiActions';
import {UiState, getDefaultUiState} from './ui/UiState';
import {UserActions, getUserActions} from './user/UserActions';
import {UserState, getDefaultUserState} from './user/UserState';

export interface AppState extends UiState, UserState {}

export function isAppState(obj: any): obj is AppState {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isAnalogClockConfig(obj.clockConfig) &&
    (obj.user === undefined || isUser(obj.user))
  );
}

export interface AppActions extends UiActions, UserActions {}

export interface AppStore extends AppState, AppActions {}

export type AppStoreSetter = {
  (
    partial: AppStore | Partial<AppStore> | ((state: AppStore) => AppStore | Partial<AppStore>),
    replace?: false,
    action?: string
  ): void;
  (state: AppStore | ((state: AppStore) => AppStore), replace: true, action?: string): void;
};

const innerUseAppStore = combine(
  {
    ...getDefaultUserState(),
    ...getDefaultUiState()
  },

  (set) => ({
    ...getUiActions(set),
    ...getUserActions(set)
  })
);

export const useAppStore = envConfig.debug ? create(devtools(logger(innerUseAppStore))) : create(innerUseAppStore);

if (envConfig.debug) {
  // When you're done with the store, clean it up
  // @ts-ignore
  useAppStore.devtools.cleanup();
}
