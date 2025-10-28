import {globalStyle, style} from '@vanilla-extract/css';

import {vars} from '../themes.css';

export const mainMenu = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  backgroundColor: vars.colors.primary,
  width: '100%',
  color: 'white',
  padding: 4
});

globalStyle(`${mainMenu} > div `, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 24
});

globalStyle(`${mainMenu} > div:first-child `, {
  width: 50
});

globalStyle(`${mainMenu} > div:last-child `, {
  width: 50,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0
});

globalStyle(`${mainMenu} a:link, ${mainMenu} a:visited, ${mainMenu} a:active `, {
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  textDecoration: 'none'
});

globalStyle(`${mainMenu} a i`, {
  fontSize: '140%'
});

globalStyle(`${mainMenu} a:hover`, {});
