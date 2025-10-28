import {Route, Router, Switch} from 'wouter';

import {app} from './App.css';
import {DeviceInfoContextProvider} from './commons/DeviceInfoContext';
import GameView from './game/GameView';
import {defaultTheme} from './themes.css';
import useLoadStateFromStorage from './useLoadStateFromStorage';
import UserView from './user/UserView';
import WelcomeView from './welcome/WelcomeView';

const App = () => {
  const appCssClasses = [defaultTheme, app].join(' ');

  const [loading] = useLoadStateFromStorage();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DeviceInfoContextProvider>
      <Router>
        <div className={appCssClasses}>
          <Switch>
            <Route path="/welcome" component={WelcomeView} />
            <Route path="/game" component={GameView} />
            <Route path="/user" component={UserView} />
            <Route component={WelcomeView} />
          </Switch>
        </div>
      </Router>
    </DeviceInfoContextProvider>
  );
};

export default App;
