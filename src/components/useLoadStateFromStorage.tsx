import {useEffect, useState} from 'react';

import logger from '../data/service/Logger';
import localStorageStatePersistorService from '../data/service/impl/LocalStorageStatePersistorService';
import {createNewUser} from '../domain/User';
import {useAppStore} from '../state/store';

export default function useLoadStateFromStorage() {
  const [loading, setLoading] = useState<boolean>(true);

  const setUser = useAppStore((state) => state.setUser);
  const setClockConfig = useAppStore((state) => state.setClockConfig);

  useEffect(() => {
    setLoading(true);

    localStorageStatePersistorService
      .loadState()
      .then((state) => {
        if (state && state.user) {
          logger.debug(`Loaded state`);
          logger.debug(state);
          setUser(state.user);
          setClockConfig(state.clockConfig);
        } else {
          const newUser = createNewUser('Spieler 1');
          logger.debug(`Creating new user ${newUser.id} ${newUser.name}`);
          setUser(newUser);
        }
      })
      .finally(() => {
        console.log('done loading state...');
        setLoading(false);
      });
  }, []);

  return [loading];
}
