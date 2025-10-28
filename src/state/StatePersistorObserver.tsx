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
  const state = useAppStore((state) => state);
  const prevState = usePrevious(state);

  const persistState = useCallback(() => {
    const stateChanged = state && state !== prevState;

    if (stateChanged) {
      setTimeout(async () => {
        try {
          logger.debug(`StatePersistorObserver saving state`, state);
          await LocalStorageStatePersistorService.persistState(state);
        } catch (e: any) {
          logger.error(e);
        }
      }, 1);
    }
  }, [state, prevState]);

  useEffect(() => void persistState(), [persistState]);

  return null;
}
