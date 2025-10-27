import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';

export const welcomeView = style([
  viewBase,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center',
    width: '100%'
  }
]);

globalStyle(`${welcomeView} label`, {
  display: 'block'
});

export const timeText = style({
  fontSize: '120%',
  textAlign: 'center'
});
