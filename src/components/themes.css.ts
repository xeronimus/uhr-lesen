import {createTheme, createThemeContract} from '@vanilla-extract/css';

const colors = {
  fontGrey: '#363636',
  backgroundGrey: '#e6e6e6',
  primary: '#a41fff',
  primaryHue: '#a41fff',
  red: '#fa5320',
  redHue: 'rgba(250,83,32,0.74)',
  blue: '#00a6ff',
  blueHue: 'rgba(0,166,255,0.66)'
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
