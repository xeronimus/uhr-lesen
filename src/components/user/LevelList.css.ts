import {globalStyle, style} from '@vanilla-extract/css';

export const levelListContainer = style({});

globalStyle(`${levelListContainer} li `, {
  listStyleType: 'none',
  padding: 4,
  textAlign: 'center',
});


export const highlighted = style({
  fontWeight: 'bold',
})
