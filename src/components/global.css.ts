import {globalStyle} from '@vanilla-extract/css';

import {vars} from './themes.css';

globalStyle('body', {
  fontFamily: 'Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none'
});

globalStyle('#root', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

// -- forms and input elements

globalStyle('input[type=text]', {
  padding: '4px 8px',
  outline: 'none',
  border: `2px solid ${vars.colors.fontGrey}`,
  borderRadius: 20,
  textAlign: 'center'
});

globalStyle('input[type=text]:active, input[type=text]:focus', {
  border: `2px solid ${vars.colors.primary}`
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
