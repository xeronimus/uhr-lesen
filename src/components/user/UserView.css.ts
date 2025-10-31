import {globalStyle, style} from '@vanilla-extract/css';

import {viewBase} from '../commons/_commons.css';

export const userView = style([viewBase, {}]);

globalStyle(`${userView} h4`, {
  marginBottom: 2,
  paddingBottom: 2,
  width: '100%',
  borderBottom: '1px solid gray'
});
globalStyle(`${userView} p`, {
  marginTop: 2,
  marginBottom: 2
});
