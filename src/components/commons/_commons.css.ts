import {style} from '@vanilla-extract/css';

export const viewBase = style({
  padding: 48,
  overflowX: 'auto',
  overflowY: 'auto'
});
export const gridRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
});
