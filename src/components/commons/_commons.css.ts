import {globalStyle, style} from '@vanilla-extract/css';

import {checkboxWrapper} from './Checkbox.css';

export const viewBase = style({
  padding: 12,
  overflowX: 'auto',
  overflowY: 'auto'
});
export const gridRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
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
