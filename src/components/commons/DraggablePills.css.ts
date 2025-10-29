import {style} from '@vanilla-extract/css';

import {vars} from '../themes.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  padding: '0 20px',
  width: '100%',
  touchAction: 'pan-y'
});

export const availableArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minHeight: 36,
  minWidth: '100%'
});

export const pillsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px'
});

export const pill = style({
  padding: '6px 16px',
  backgroundColor: vars.colors.backgroundGrey,
  borderRadius: 8,
  cursor: 'grab',
  userSelect: 'none',
  fontSize: '16px',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease',
  touchAction: 'none',
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`
  },
  ':active': {
    cursor: 'grabbing',
    transform: 'scale(0.95)'
  }
});

export const rectangle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  minHeight: 36,
  padding: 4,
  border: `2px dashed ${vars.colors.primaryHue}`,
  borderRadius: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  touchAction: 'pan-x'
});

export const placeholder = style({
  color: '#999',
  fontSize: '16px',
  fontStyle: 'italic',
  width: '100%',
  textAlign: 'center'
});

export const pillDragOver = style({
  opacity: 0.5,
  transform: 'scale(0.95)'
});

export const pillDragging = style({
  opacity: 0.3,
  transform: 'scale(0.9)'
});

export const floatingPill = style({
  position: 'fixed',
  padding: '8px 16px',
  backgroundColor: vars.colors.primary,
  color: 'white',
  borderRadius: 8,
  fontSize: '16px',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  opacity: 0.9
});
