import {style} from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
});

export const dialog = style({
  backgroundColor: 'white',
  borderRadius: '1em',
  padding: 24,
  maxWidth: 400,
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
});

export const message = style({
  fontSize: '110%',
  textAlign: 'center',
  lineHeight: 1.5
});

export const buttons = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  justifyContent: 'center'
});
