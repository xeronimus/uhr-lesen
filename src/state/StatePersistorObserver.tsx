import {useCallback, useEffect} from 'react';

import logger from '../data/service/Logger';
import LocalStorageStatePersistorService from '../data/service/impl/LocalStorageStatePersistorService';
import {useAppStore} from './store';
import usePrevious from './usePrevious';

/**
 * This (null-) component subscribes to different properties in our state
 * and persists the data to storage when those properties change.
 *
 */
export default function StatePersistorObserver() {
  const user = useAppStore((state) => state.user);
  const prevUser = usePrevious(user);

  const persistState = useCallback(() => {
    const userChanged = user && user !== prevUser;

    if (userChanged) {
      logger.debug(`StatePersistorObserver: userChanged=${userChanged} `);

      setTimeout(async () => {
        try {
          logger.debug(`saving state ${user.id} ${user.name}`);
          await LocalStorageStatePersistorService.persistState({user});
        } catch (e: any) {
          logger.error(e);
        }
      }, 1);
    }
  }, [user, prevUser]);

  useEffect(() => void persistState(), [persistState]);

  return null;
}
