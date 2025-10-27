import {globalStyle, style} from '@vanilla-extract/css';

import {checkboxWrapper} from './Checkbox.css';

export const viewBase = style({
  padding: 48,
  overflowX: 'auto',
  overflowY: 'auto'
});
export const gridRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12
});
export const gridRowStack = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12
});

export const growRow = style([
  gridRow,
  {
    flexGrow: 1
  }
]);

globalStyle(`${gridRow} ${checkboxWrapper}`, {
  marginTop: 4
});
