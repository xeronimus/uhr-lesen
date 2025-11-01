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
  padding: 0
});

globalStyle(`${mainMenu} > div `, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4
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

export const link = style({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  padding: '4px 8px'
});

const boxShadowColorActiveLink = 'rgba(0,0,0,0.6)';
export const activeLink = style([
  link,
  {
    boxShadow: `inset 0px 0px 15px -1px ${boxShadowColorActiveLink}`
  }
]);

// globalStyle(`${mainMenu} a:link, ${mainMenu} a:visited, ${mainMenu} a:active `, {
//
// });

globalStyle(`${link} i`, {
  fontSize: '140%'
});

// globalStyle(`${mainMenu} a:hover`, {});
