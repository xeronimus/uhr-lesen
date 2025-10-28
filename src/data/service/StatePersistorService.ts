import {AppState} from '../../state/store';

export default interface StatePersistorService {
  persistState: (state: AppState) => Promise<void>;
  loadState: () => Promise<AppState | undefined>;
}
