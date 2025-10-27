import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';

export const welcomeView = style([
  viewBase,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  }
]);

globalStyle(`${welcomeView} label`, {
  display: 'block'
});

export const timeText = style({
  fontSize: '120%'
});
