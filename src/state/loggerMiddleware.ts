import {StateCreator, StoreMutatorIdentifier} from 'zustand';

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(f: StateCreator<T, [], []>) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f) => (set, get, store) => {
  const loggedSet: typeof set = (...a: any[]) => {
    if (a.length !== 3) {
      console.log(a[0]);
      (set as any)(...a); // call real set method
      return;
    }

    const setPayload = a[0];
    const actionName = a[2];

    let stateBefore = get();

    console.group(`zustand:${actionName}`);
    Object.keys(setPayload).forEach((key) => {
      //@ts-ignore
      console.info(key, stateBefore[key], '↣', setPayload[key]);
    });
    console.groupEnd();

    (set as any)(...a); // call real set method
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
