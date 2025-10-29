import {globalStyle, style} from '@vanilla-extract/css';

import {checkboxWrapper} from './Checkbox.css';

export const viewBase = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignItems: 'center',
  width: '100%'
});
export const gridRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 12
});
export const gridRowStacked = style([gridRow,{
  flexDirection: 'column',
}]);

export const growRow = style([
  gridRow,
  {
    flexGrow: 1
  }
]);

globalStyle(`${gridRow} ${checkboxWrapper}`, {
  marginTop: 4
});
