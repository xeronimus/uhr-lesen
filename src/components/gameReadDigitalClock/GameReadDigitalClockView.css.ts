import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';
import {vars} from '../themes.css';

export const gameView = style([viewBase, {}]);

globalStyle(`${gameView} h4`, {
  margin: 2
});

export const hintText = style({
  fontSize: '110%',
  fontWeight: 'bold',
  color: vars.colors.primary
});
