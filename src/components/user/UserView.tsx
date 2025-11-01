import {useEffect, useState} from 'react';

import {getUserLevelInfoForPoints} from '../../domain/BaseLevel';
import {sortedLevels as gameOneLevels} from '../../domain/ReadAnalogClockLevel';
import {sortedLevels as gameTwoLevels} from '../../domain/ReadDigitalClockLevel';
import {useAppStore} from '../../state/store';
import {selectTotalPoints, selectUserOrThrow} from '../../state/user/userSelectors';
import BuildInfo from '../commons/BuildInfo';
import Button from '../commons/Button';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import LevelList from './LevelList';
import * as styles from './UserView.css';

const UserView = () => {
  const user = useAppStore(selectUserOrThrow);
  const totalPoints = useAppStore(selectTotalPoints);
  const setUser = useAppStore((state) => state.setUser);

  const [myName, setMyName] = useState<string>(user.name);
  useEffect(() => {
    setMyName(user.name);
  }, [user]);

  const [gameOneLevel, gameOneGapToNextLevel] = getUserLevelInfoForPoints(gameOneLevels, user.points[0]);
  const [gameTwoLevel, gameTwoGapToNextLevel] = getUserLevelInfoForPoints(gameTwoLevels, user.points[1]);

  return (
    <div className={styles.userView}>
      <div className={cStyles.gridRow}></div>

      <div className={cStyles.gridRowStackedCentered}>
        <input type="text" id="name" value={myName} onChange={onUserNameChange} onBlur={onUserNameBlur} />

        <h3>
          Total Punkte: <i className="icon icon-star" /> {totalPoints}
        </h3>

        <h4>
          Spiel 1 : Uhr lesen <i className="icon icon-star" /> {user.points[0]}
        </h4>
        <p>
          Punkte bis zum nächsten Level: {gameOneGapToNextLevel} (
          {Math.ceil(gameOneGapToNextLevel / gameOneLevel.pointFactor)} richtige)
        </p>
        <LevelList currentLevel={gameOneLevel} levels={gameOneLevels} />

        <h4>
          Spiel 2 : Digitale Uhr <i className="icon icon-star" /> {user.points[1]}
        </h4>
        <p>
          Punkte bis zum nächsten Level: {gameTwoGapToNextLevel} (
          {Math.ceil(gameTwoGapToNextLevel / gameTwoLevel.pointFactor)} richtige)
        </p>
        <LevelList currentLevel={gameTwoLevel} levels={gameTwoLevels} />
      </div>

      <div className={cStyles.growRow}></div>

      <div className={cStyles.gridRowStacked}>
        <Button onClick={resetAllPoints}>Alle Punkte Zurücksetzen!</Button>
      </div>
      <div className={cStyles.growRow}>
        <BuildInfo />
      </div>

      <MainMenu />
    </div>
  );

  function resetAllPoints() {
    setUser({
      ...user,
      points: [0, 0]
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
