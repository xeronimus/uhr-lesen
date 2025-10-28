import {useEffect} from 'react';
import {Route, Router, Switch} from 'wouter';

import logger from '../data/service/Logger';
import localStorageStatePersistorService from '../data/service/impl/LocalStorageStatePersistorService';
import {createNewUser} from '../domain/User';
import {useAppStore} from '../state/store';
import {app} from './App.css';
import {DeviceInfoContextProvider} from './commons/DeviceInfoContext';
import {defaultTheme} from './themes.css';
import WelcomeView from './welcome/WelcomeView';

const App = () => {
  const appCssClasses = [defaultTheme, app].join(' ');

  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    localStorageStatePersistorService.loadState().then((state) => {
      if (state && state.user) {
        logger.debug(`Loaded user from state ${state.user.id} ${state.user.name}`);
        setUser(state.user);
      } else {
        const newUser = createNewUser('Spieler 1');
        logger.debug(`Creating new user ${newUser.id} ${newUser.name}`);
        setUser(newUser);
      }
    });
  }, []);

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
