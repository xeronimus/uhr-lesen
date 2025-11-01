import {globalStyle, style} from '@vanilla-extract/css';

export const icon = style({
  cursor: 'pointer'
});

globalStyle(`${icon}.icon-disabled`, {
  cursor: 'default',
  color: '#ccc'
});
