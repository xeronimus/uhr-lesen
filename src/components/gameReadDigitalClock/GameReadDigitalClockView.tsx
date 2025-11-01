import {useEffect, useRef, useState} from 'react';

import {getMatchingLevelForPoints} from '../../domain/BaseLevel';
import ReadDigitalClockLevel, {sortedLevels as levels} from '../../domain/ReadDigitalClockLevel';
import {updatePointsInUserPointsArray} from '../../domain/User';
import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import AnalogClock from '../clock/AnalogClock';
import DigitalClock from '../clock/DigitalClock';
import Button from '../commons/Button';
import Celebration from '../commons/Celebration';
import IconButton from '../commons/IconButton';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './GameReadDigitalClockView.css';

const GameReadDigitalClockView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);
  const maxLevel = getMatchingLevelForPoints(levels, user.points[1]);
  const [level, setLevel] = useState<ReadDigitalClockLevel>(maxLevel);

  const [celebrEffectPointsVisible, setCelebrEffectPointsVisible] = useState<boolean>(false);
  const [celebrEffectLevelVisible, setCelebrEffectLevelVisible] = useState<boolean>(false);

  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const usersResult = useRef<[number, number]>([0, 0]); // no need to rerender when user drags clock hands
  const audioRef = useRef<HTMLAudioElement>(null);

  function setNewTimeTask() {
    const [rndHour, rndMinute] = level.getRandomTime();
    setHour(rndHour);
    setMinute(rndMinute);
  }

  useEffect(() => {
    setNewTimeTask();
  }, []);

  return (
    <div className={styles.gameView}>
      {celebrEffectPointsVisible && <Celebration text="Richtig!" />}
      {celebrEffectLevelVisible && <Celebration text="Neues Level!" stickier={true} />}
      <audio ref={audioRef} controls={false} preload={'auto'} src="/sound/win.mp3" />

      <div className={cStyles.gridRow}>
        <h4>
          <IconButton iconClass={`icon-left-dir`} onClick={onLevelBackClick} disabled={level.levelIndex < 1} />
          <span onClick={setNewTimeTask}>{level.title}</span>
          <IconButton
            iconClass="icon-right-dir"
            onClick={onLevelForwardClick}
            disabled={level.levelIndex >= maxLevel.levelIndex}
          />
        </h4>
      </div>

      <div className={cStyles.gridRowStackedCentered}>
        <DigitalClock hour={hour} minute={minute} />

        <h4>Stelle die Uhr richtig ein</h4>
        <div style={{width: 'min(90vmin, 600px)', height: 'min(90vmin, 600px)', aspectRatio: '1 / 1'}}>
          <AnalogClock hour={0} minute={0} config={level.clockConfig} onChange={onClockHandsDragged} />
        </div>
      </div>

      <div className={cStyles.growRow}>
        <Button onClick={onCheckClicked} primary={true}>
          Prüfen
        </Button>
      </div>

      <MainMenu />
    </div>
  );

  function onClockHandsDragged(hour: number, minute: number) {
    usersResult.current = [hour, minute];
  }

  function onLevelBackClick() {
    if (level.levelIndex > 0) {
      const newLevel = levels[level.levelIndex - 1];
      setLevel(newLevel);
      setNewTimeTask();
    }
  }

  function onLevelForwardClick() {
    if (level.levelIndex < maxLevel.levelIndex) {
      const newLevel = levels[level.levelIndex + 1];
      setLevel(newLevel);
      setNewTimeTask();
    }
  }

  function onCheckClicked() {
    const userResultHour = usersResult.current[0];
    const userResultMinute = usersResult.current[1];
    if (userResultMinute === minute && (userResultHour === hour || userResultHour + 12 === hour)) {
      setNewTimeTask();

      const newTotalPoints = user.points[1] + level.pointFactor;

      setUser({
        ...user,
        points: updatePointsInUserPointsArray(user.points, 1, newTotalPoints)
      });

      // new total points, could be advancing to next level
      const potentiallyNewLevel = getMatchingLevelForPoints(levels, newTotalPoints);
      if (potentiallyNewLevel.threshold !== level.threshold) {
        setLevel(potentiallyNewLevel);
        showCelebrationEffectLevel();
      } else {
        showCelebrationEffectPoints();
      }
    }
  }

  function showCelebrationEffectPoints() {
    setCelebrEffectPointsVisible(true);
    setTimeout(() => setCelebrEffectPointsVisible(false), 2100);
  }

  function showCelebrationEffectLevel() {
    audioRef.current?.play();
    setCelebrEffectLevelVisible(true);
    setTimeout(() => setCelebrEffectLevelVisible(false), 5100);
  }
};

export default GameReadDigitalClockView;
