export const View = {
  WELCOME: 'welcome'
} as const;

export type ViewType = (typeof View)[keyof typeof View];

export function deriveViewFromCurrentLocation(location: string): ViewType {
  if (location.startsWith('/welcome')) {
    return View.WELCOME;
  }

  return View.WELCOME;
}

export interface UiState {}

export const getDefaultUiState = (): UiState => {
  return {};
};
