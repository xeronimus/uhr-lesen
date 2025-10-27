import {style, styleVariants} from '@vanilla-extract/css';

import {vars} from '../themes.css';

export const checkboxWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  userSelect: 'none',
  cursor: 'pointer'
});

const checkboxMarkerBase = style({
  marginLeft: 4,
  marginRight: 4,
  position: 'relative',
  boxSizing: 'border-box',
  width: 16,
  height: 16,
  border: `2px solid ${vars.colors.fontGrey}`,
  borderRadius: '50%',
  ':after': {
    content: ' ',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'transparent',
    top: 2,
    left: 2
  }
});

export const checkboxMarkerVariants = styleVariants({
  default: [checkboxMarkerBase],
  checked: [
    checkboxMarkerBase,
    {
      ':after': {
        background: vars.colors.fontGrey
      }
    }
  ]
});
