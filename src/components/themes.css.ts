import {createTheme, createThemeContract} from '@vanilla-extract/css';
import tinycolor from 'tinycolor2';

const colors = {
  fontGrey: '#363636',
  lightBorderGrey: '#e4e4e4',
  highlighting: '#eaebef',
  warning: '#ff8100',
  primary: '#619bf2ff',
  primaryLight: tinycolor('#619bf2ff').lighten(13).setAlpha(0.8).toRgbString()
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
