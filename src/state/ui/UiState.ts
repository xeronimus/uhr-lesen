import AnalogClockConfig from '../../domain/AnalogClockConfig';

export const View = {
  WELCOME: 'welcome',
  GAME: 'game',
  USER: 'game'
} as const;

export type ViewType = (typeof View)[keyof typeof View];

export function deriveViewFromCurrentLocation(location: string): ViewType {
  if (location.startsWith('/welcome')) {
    return View.WELCOME;
  }
  if (location.startsWith('/game')) {
    return View.WELCOME;
  }
  if (location.startsWith('/user')) {
    return View.USER;
  }

  return View.WELCOME;
}

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
