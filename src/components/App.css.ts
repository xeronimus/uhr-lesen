import {globalStyle, style, styleVariants} from '@vanilla-extract/css';

export const app = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'stretch',
  height: '100%'
});

export const topScreenWarning = style({
  position: 'fixed',
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vh',
  zIndex: '30000'
});

globalStyle(`${topScreenWarning} > div`, {
  boxShadow: '0px 0px 11px 0px rgb(0 0 0 / 48%)',
  fontSize: 'large',
  margin: '16px 0',
  padding: 8,
  border: '1px solid #ffe69c',
  borderRadius: 8,
  background: '#fff3cd',
  color: '#664d03',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8
});

export const envMarkerVariants = styleVariants({
  dev: {
    display: 'block',
    width: 12,
    height: '100vh',
    backgroundColor: 'rgb(255 213 0 / 45%)',
    position: 'absolute',
    zIndex: '22001',
    ':after': {
      content: '🩺',
      fontSize: 'xx-small',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    }
  },
  prod: {
    display: 'none',
    width: 0,
    height: 0,
    position: 'fixed'
  }
});
