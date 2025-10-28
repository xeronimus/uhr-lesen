import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';

export const welcomeView = style([viewBase, {}]);

globalStyle(`${welcomeView} label`, {
  display: 'block'
});

export const timeText = style({
  fontSize: '120%',
  textAlign: 'center'
});
export const footer = style({});
