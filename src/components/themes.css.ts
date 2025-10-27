import {createTheme, createThemeContract} from '@vanilla-extract/css';

const colors = {
  fontGrey: '#363636',
  red: '#fa5320',
  blue: '#00a6ff',
};

const constants = {
  sideBarWidth: '500px'
};

export const vars = createThemeContract({
  colors: {
    ...colors
  },
  constants: {
    ...constants
  }
});

export const defaultTheme = createTheme(vars, {
  colors: {
    ...colors
  },
  constants: {
    ...constants
  }
});
