import AnalogClockConfig from '../../domain/AnalogClockConfig';
import {AppStoreSetter} from '../store';

export interface UiActions {
  setClockConfig(clockConfig: AnalogClockConfig): void;
}

export const getUiActions = (set: AppStoreSetter): UiActions => {
  return {
    setClockConfig: (clockConfig) => set({clockConfig}, undefined, 'ui/setClockConfig')
  };
};
