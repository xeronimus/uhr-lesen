import AnalogClockConfig from '../../domain/AnalogClockConfig';

export interface UiState {
  clockConfig: AnalogClockConfig;
}

export const getDefaultUiState = (): UiState => {
  return {
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: false
    }
  };
};
