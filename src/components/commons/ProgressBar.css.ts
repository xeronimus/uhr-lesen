import {style} from '@vanilla-extract/css';

import {vars} from '../themes.css';

export const container = style({
  width: '100%',
  height: 20,
  backgroundColor: vars.colors.backgroundGrey,
  borderRadius: 10,
  overflow: 'hidden',
  position: 'relative'
});

export const fill = style({
  height: '100%',
  backgroundColor: vars.colors.primary,
  transition: 'width 0.3s ease',
  borderRadius: 10
});

export const label = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '80%',
  fontWeight: 'bold',
  color: vars.colors.fontGrey
});
