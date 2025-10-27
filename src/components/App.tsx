import {Route, Router, Switch} from 'wouter';

import {app} from './App.css';
import {DeviceInfoContextProvider} from './commons/DeviceInfoContext';
import {defaultTheme} from './themes.css';
import WelcomeView from './welcome/WelcomeView';

const App = () => {
  const appCssClasses = [defaultTheme, app].join(' ');

  return (
    <DeviceInfoContextProvider>
      <Router>
        <div className={appCssClasses}>
          <Switch>
            <Route path="/welcome" component={WelcomeView} />
            <Route component={WelcomeView} />
          </Switch>
        </div>
      </Router>
    </DeviceInfoContextProvider>
  );
};

export default App;
