import {globalStyle} from '@vanilla-extract/css';

import {vars} from './themes.css';

globalStyle('body', {
  fontFamily: 'Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif'
});

globalStyle('a, a:link, a:visited', {
  color: vars.colors.primary,
  textDecoration: 'none'
});

globalStyle('a:hover', {
  textDecoration: 'underline'
});

globalStyle('#root', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

// -- customize browser scrollbars

globalStyle(
  `
body::-webkit-scrollbar,
body ::-webkit-scrollbar
`,
  {
    width: 0,
    height: 0,
    background: 'transparent'
  }
);

globalStyle(
  `
body::-webkit-scrollbar-button:vertical:end:decrement,
body ::-webkit-scrollbar-button:vertical:end:decrement,
body::-webkit-scrollbar-button:vertical:start:increment,
body ::-webkit-scrollbar-button:vertical:start:increment,
body::-webkit-scrollbar-button:horizontal:end:decrement,
body ::-webkit-scrollbar-button:horizontal:end:decrement,
body::-webkit-scrollbar-button:horizontal:start:increment,
body ::-webkit-scrollbar-button:horizontal:start:increment
`,
  {
    display: 'none'
  }
);

globalStyle(
  `
body::-webkit-scrollbar-thumb:vertical,
body ::-webkit-scrollbar-thumb:vertical
`,
  {
    boxShadow: 'inset 3px 0 #fff',
    border: 'transparent'
  }
);

globalStyle(
  `
body::-webkit-scrollbar-thumb:horizontal,
body ::-webkit-scrollbar-thumb:horizontal
`,
  {
    boxShadow: 'inset 3px 0 #fff',
    border: 'transparent'
  }
);

globalStyle(
  `
body::-webkit-scrollbar-thumb:vertical:hover,
body ::-webkit-scrollbar-thumb:vertical:hover
`,
  {
    boxShadow: 'none'
  }
);
