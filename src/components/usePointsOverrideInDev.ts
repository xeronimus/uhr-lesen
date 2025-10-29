import {useEffect} from 'react';

import envConfig from '../envConfig';
import {useAppStore} from '../state/store';

export default function usePointsOverrideInDev() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    if (envConfig.isDev && user) {
      console.log('DEV Mode: global function overridePoints(100) ');
      //@ts-ignore
      window.overridePoints = (points: number) => {
        setUser({
          ...user,
          totalPoints: points
        });
      };
    }
  }, [user]);
}
