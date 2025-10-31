import {useEffect, useState} from 'react';

import {getGapToNextLevel, getMatchingLevelForPoints} from '../../data/levels';
import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import BuildInfo from '../commons/BuildInfo';
import Button from '../commons/Button';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import LevelList from './LevelList';
import * as styles from './UserView.css';

const UserView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);

  const [myName, setMyName] = useState<string>(user.name);
  useEffect(() => {
    setMyName(user.name);
  }, [user]);

  const level = getMatchingLevelForPoints(user.totalPoints);
  const gapToNextLevel = getGapToNextLevel(user.totalPoints);

  return (
    <div className={styles.userView}>
      <div className={cStyles.gridRow}></div>

      <div className={cStyles.gridRowStackedCentered}>
        <input type="text" id="name" value={myName} onChange={onUserNameChange} onBlur={onUserNameBlur} />

        <h3>
          <i className="icon icon-star" /> {user.totalPoints || 0}{' '}
        </h3>

        <h4>
          Punkte bis zum nächsten Level: {gapToNextLevel} ({Math.ceil(gapToNextLevel / level.pointFactor)} richtige)
        </h4>
      </div>

      <div className={cStyles.growRow}>
        <LevelList currentLevel={level} />
      </div>

      <div className={cStyles.gridRowStacked}>
        <Button onClick={resetPoints}>Punkte Zurücksetzen!</Button>
      </div>
      <div className={cStyles.growRow}>
        <BuildInfo />
      </div>

      <MainMenu />
    </div>
  );

  function resetPoints() {
    setUser({
      ...user,
      totalPoints: 0
    });
  }

  function onUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMyName(e.target.value);
  }

  function onUserNameBlur() {
    setUser({
      ...user,
      name: myName || user.name
    });
  }
};

export default UserView;
