import 'normalize.css';
import ReactDOM from 'react-dom/client';

// @ts-ignore
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import App from './components/App';
import './components/global.css';
import './data/service/interceptHTTP';
import './resources/font/css/animation.css';
import './resources/font/css/my-life.css';

// during dev/test, we want to intercept our HTTP calls

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <App />
  </>
);
