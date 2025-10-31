import {style} from '@vanilla-extract/css';

const clockBackgroundColor = '#4e4c4c';
const clockForegroundColor = '#3bd162';

export const clockContainer = style({
  color: clockForegroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 32px',
  backgroundColor: clockBackgroundColor,
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  gap: '8px'
});

export const digitContainer = style({
  position: 'relative',
  width: '50px',
  height: '80px',
  margin: '0 4px'
});

export const segment = style({
  position: 'absolute',
  backgroundColor: 'currentColor',
  transition: 'opacity 0.1s'
});

export const segmentHorizontal = style({
  width: '40px',
  height: '6px',
  left: '5px',
  borderRadius: '3px'
});

export const segmentVertical = style({
  width: '6px',
  height: '32px',
  borderRadius: '3px'
});

// Segment positions
export const segmentA = style({
  top: '0px'
});

export const segmentB = style({
  top: '5px',
  right: '0px'
});

export const segmentC = style({
  bottom: '5px',
  right: '0px'
});

export const segmentD = style({
  bottom: '0px'
});

export const segmentE = style({
  bottom: '5px',
  left: '0px'
});

export const segmentF = style({
  top: '5px',
  left: '0px'
});

export const segmentG = style({
  top: '50%',
  transform: 'translateY(-50%)'
});

export const separator = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: '0 8px'
});

export const separatorDot = style({
  width: '8px',
  height: '8px',
  backgroundColor: 'currentColor',
  borderRadius: '50%'
});
