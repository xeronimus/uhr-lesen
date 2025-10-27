import {style} from '@vanilla-extract/css';

import {vars} from '../themes.css';
import {CLOCK_OUTER_SIZE} from './AnalogClock';

export const clockContainer = style({
  display: 'inline-block',
  position: 'relative',
  width: CLOCK_OUTER_SIZE,
  height: CLOCK_OUTER_SIZE,
  border: '8px solid #333',
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
});

export const clockCenter = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: CLOCK_OUTER_SIZE / 20,
  height: CLOCK_OUTER_SIZE / 20,
  backgroundColor: '#333',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10
});

export const hand = style({
  position: 'absolute',
  bottom: '50%',
  left: '50%',
  transformOrigin: 'bottom center',
  backgroundColor: '#333',
  borderRadius: '4px 4px 0 0'
});

export const hourHand = style({
  width: 12,
  height: 0.26 * CLOCK_OUTER_SIZE,
  marginLeft: 0,
  backgroundColor: vars.colors.red,
  ':hover': {
    boxShadow: `0 4px 10px ${vars.colors.redHue}`
  },
  ':active': {
    boxShadow: `0 4px 10px ${vars.colors.redHue}`
  }
});

export const minuteHand = style({
  width: 8,
  height: 0.38 * CLOCK_OUTER_SIZE,
  marginLeft: 0,
  backgroundColor: vars.colors.blue,
  ':hover': {
    boxShadow: `0 4px 10px ${vars.colors.blueHue}`
  },
  ':active': {
    boxShadow: `0 4px 10px ${vars.colors.blueHue}`
  }
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
