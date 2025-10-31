import {globalStyle, style} from '@vanilla-extract/css';

export const levelListContainer = style({});

globalStyle(`${levelListContainer} ol `, {
  padding: 0,
  margin: 0
});

globalStyle(`${levelListContainer} li `, {
  listStyleType: 'none',
  padding: 4,
  textAlign: 'center'
});

export const highlighted = style({
  fontWeight: 'bold'
});
