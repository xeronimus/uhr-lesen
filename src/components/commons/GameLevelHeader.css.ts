import {globalStyle, style} from '@vanilla-extract/css';

import {container as progressBar} from './ProgressBar.css';
import {gridRow} from './_commons.css';

export const gameLevelHeader = style([
  gridRow,
  {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
]);

export const spacer = style({
  margin: '0 8px',
  width: '30%'
});

globalStyle(`${gameLevelHeader} h4`, {
  flex: 1,
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

globalStyle(`${gameLevelHeader} h4 i `, {
  margin: '0 8px'
});

globalStyle(`${gameLevelHeader} ${progressBar}`, {
  margin: '0 8px',
  width: '30%',
  height: 6
});
