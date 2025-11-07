import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';

export const gameView = style([viewBase, {}]);

globalStyle(`${gameView} h4`, {
  margin: 2
});
