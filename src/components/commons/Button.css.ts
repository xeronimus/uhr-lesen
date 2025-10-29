import {globalStyle, style, styleVariants} from '@vanilla-extract/css';

import {vars} from '../themes.css';

const buttonBase = style({
  fontSize: '120%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: 'none',
  borderRadius: '1em',
  outline: 'none',
  padding: '6px 12px',
  background: vars.colors.backgroundGrey,
  selectors: {
    '&:hover:not(:disabled), &:focus:not(:disabled), &:active:not(:disabled)': {
      boxShadow: `0px 0px 7px 0px ${vars.colors.primaryHue}`
    },
    '&:not(disabled)': {
      cursor: 'pointer'
    }
  }
});

globalStyle(`${buttonBase} > i`, {
  display: 'block',
  margin: '0 4px 0 0'
});

export const buttonVariants = styleVariants({
  default: [buttonBase, {}],
  primary: [
    buttonBase,
    {
      selectors: {
        '&:hover:not(:disabled), &:focus:not(:disabled), &:active:not(:disabled)': {
          boxShadow: `0 0 7px 0 ${vars.colors.primaryHue}`
        },
        '&:not(:disabled)': {
          background: vars.colors.primary,
          color: 'white'
        }
      }
    }
  ]
});
