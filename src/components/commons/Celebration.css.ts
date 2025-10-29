import {keyframes, style} from '@vanilla-extract/css';

import {vars} from '../themes.css';

const explode = keyframes({
  '0%': {
    transform: 'translate(0, 0) scale(1)',
    opacity: 1
  },
  '100%': {
    transform: 'translate(var(--x), var(--y)) scale(0)',
    opacity: 0
  }
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.5)'
  },
  '50%': {
    opacity: 1,
    transform: 'scale(1.2)'
  },
  '100%': {
    opacity: 0,
    transform: 'scale(1)'
  }
});

export const celebrationContainer = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  zIndex: 9999,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const particle = style({
  position: 'absolute',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: vars.colors.primary,
  animation: `${explode} 1s ease-out forwards`
});

export const celebrationText = style({
  fontSize: '3.2rem',
  fontWeight: 'bold',
  color: vars.colors.primary,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 2s ease-out forwards`,
  userSelect: 'none'
});

export const celebrationTextLong = style([
  celebrationText,
  {
    fontSize: '4.1rem',
    animation: `${fadeIn} 5s ease-out forwards`
  }
]);

// Generate particle styles with different trajectories
export const particleCount = 30;
const particleStyles: Record<string, string> = {};

for (let i = 0; i < particleCount; i++) {
  const angle = (360 / particleCount) * i;
  const distance = 150 + Math.random() * 100;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  const colors = [
    vars.colors.primary,
    vars.colors.primaryHue,
    '#FFD700', // gold
    '#FF69B4', // pink
    '#00CED1', // turquoise
    '#FF6347' // tomato
  ];

  const color = colors[i % colors.length];
  const delay = Math.random() * 0.2;

  particleStyles[`particle${i}`] = style({
    vars: {
      '--x': `${x}px`,
      '--y': `${y}px`
    },
    backgroundColor: color,
    animationDelay: `${delay}s`,
    width: `${8 + Math.random() * 6}px`,
    height: `${8 + Math.random() * 6}px`
  });
}

export {particleStyles};
