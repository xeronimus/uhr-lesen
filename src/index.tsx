import 'normalize.css';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './components/global.css';
import './resources/font/css/animation.css';
import './resources/font/css/uhr-lesen.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <App />
  </>
);
