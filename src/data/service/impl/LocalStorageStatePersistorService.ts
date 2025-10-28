import {AppState} from '../../../state/store';
import logger from '../Logger';
import StatePersistorService from '../StatePersistorService';
import {b64_to_utf8, utf8_to_b64} from './b64';

const LSTORAGE_PROP_PREFIX = 'UHR_LESEN';

const LocalStorageStatePersistorService: StatePersistorService = {
  async loadState(): Promise<AppState | undefined> {
    const state = fromLocalStorage('state');
    return state ? (state as AppState) : undefined;
  },

  async persistState(state: AppState): Promise<void> {
    toLocalStorage(state, 'state');
  }
};

function toLocalStorage(obj: Object, key: string) {
  localStorage.setItem(`${LSTORAGE_PROP_PREFIX}:${key}`, utf8_to_b64(JSON.stringify(obj)));
}

function fromLocalStorage(key: string): object | undefined {
  const persistedState = localStorage.getItem(`${LSTORAGE_PROP_PREFIX}:${key}`);
  if (!persistedState) {
    return undefined;
  }

  try {
    return JSON.parse(b64_to_utf8(persistedState));
  } catch (e: any) {
    logger.error(e);
    return undefined;
  }
}

export default LocalStorageStatePersistorService;
