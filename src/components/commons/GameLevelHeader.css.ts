import {globalStyle, style} from '@vanilla-extract/css';

export const gameLevelHeader = style({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

globalStyle(`${gameLevelHeader} h4 i `, {
  margin: '0 8px'
});
