import {Route, Router, Switch} from 'wouter';

import {app} from './App.css';
import {DeviceInfoContextProvider} from './commons/DeviceInfoContext';
import GameReadAnalogClockView from './gameReadAnalogClock/GameReadAnalogClockView';
import GameReadDigitalClockView from './gameReadDigitalClock/GameReadDigitalClockView';
import {defaultTheme} from './themes.css';
import useLoadStateFromStorage from './useLoadStateFromStorage';
import usePointsOverrideInDev from './usePointsOverrideInDev';
import UserView from './user/UserView';
import WelcomeView from './welcome/WelcomeView';

const App = () => {
  const appCssClasses = [defaultTheme, app].join(' ');

  const [loading] = useLoadStateFromStorage();

  usePointsOverrideInDev();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DeviceInfoContextProvider>
      <Router>
        <div className={appCssClasses}>
          <Switch>
            <Route path="/welcome" component={WelcomeView} />
            <Route path="/game-analog-clock" component={GameReadAnalogClockView} />
            <Route path="/game-digital-clock" component={GameReadDigitalClockView} />
            <Route path="/user" component={UserView} />
            <Route component={WelcomeView} />
          </Switch>
        </div>
      </Router>
    </DeviceInfoContextProvider>
  );
};

export default App;
