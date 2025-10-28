import {globalStyle, style} from '@vanilla-extract/css';

import {vars} from '../themes.css';

export const clockContainer = style({
  boxSizing: 'border-box',
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  height: '100%',
  aspectRatio: '1 / 1',
  border: '8px solid #333',
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  touchAction: 'none'
});

export const clockCenter = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '5%', // 1/20 = 5%
  height: '5%',
  backgroundColor: '#333',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10
});

const hand = style({
  position: 'absolute',
  bottom: '50%',
  left: '50%',
  transformOrigin: 'bottom center',
  touchAction: 'none',
  padding: '0 20px', // Larger invisible hit box for touch
  // Visual hand is created with ::before
  '::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '6px 6px 0 0'
  }
});

export const hourHand = style([
  hand,
  {
    width: 12,
    height: '26%',
    marginLeft: 0,
    '::before': {
      width: 12,
      height: '100%',
      backgroundColor: vars.colors.red
    }
  }
]);

globalStyle(`${hourHand}:hover::before`, {
  boxShadow: `0 4px 10px ${vars.colors.redHue}`
});

globalStyle(`${hourHand}:active::before`, {
  boxShadow: `0 4px 10px ${vars.colors.redHue}`
});

export const minuteHand = style([
  hand,
  {
    width: 8,
    height: '38%',
    marginLeft: 0,
    '::before': {
      width: 8,
      height: '100%',
      backgroundColor: vars.colors.blue
    }
  }
]);

globalStyle(`${minuteHand}:hover::before`, {
  boxShadow: `0 4px 10px ${vars.colors.blueHue}`
});

globalStyle(`${minuteHand}:active::before`, {
  boxShadow: `0 4px 10px ${vars.colors.blueHue}`
});

export const numberHours = style({
  position: 'absolute',
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  fontWeight: 'bold',
  color: '#333',
  userSelect: 'none'
});
export const numberHours24 = style({
  position: 'absolute',
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 'bold',
  padding: 0,
  backgroundColor: '#888',
  color: '#fff',
  borderRadius: '50%',
  userSelect: 'none'
});

export const numberMinutes = style({
  position: 'absolute',
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  fontWeight: 'bold',
  color: '#888',
  userSelect: 'none'
});
export const ticksMinutes = style({
  position: 'absolute',
  borderLeft: '2px solid #888',
  width: 1,
  height: 10,
  userSelect: 'none'
});
