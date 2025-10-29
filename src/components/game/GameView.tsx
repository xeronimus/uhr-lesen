import {useEffect, useRef, useState} from 'react';

import {addWordsLc, hourNamesLc, minuteNamesLc, timeToGerman} from '../../data/timeToGerman';
import Level from '../../domain/Level';
import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import AnalogClock from '../clock/AnalogClock';
import Button from '../commons/Button';
import DraggablePills from '../commons/DraggablePills';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import getRandomInt from '../getRandomInt';
import * as styles from './GameView.css';

const levels: Level[] = [
  {
    title: 'Level 1',
    pointFactor: 1,
    threshold: 0,
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: false
    },
    getRandomTime: () => {
      const randomQuarter = getRandomInt(0, 4);
      const minute = randomQuarter * 15;
      const hour = getRandomInt(1, 13);
      return [hour, minute];
    }
  },
  {
    title: 'Level 2',
    pointFactor: 2,
    threshold: 10,
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: false
    },
    getRandomTime: () => {
      const randomSixth = getRandomInt(0, 6);
      const minute = randomSixth * 10;
      const hour = getRandomInt(1, 13);
      return [hour, minute];
    }
  },
  {
    title: 'Level 3',
    pointFactor: 5,
    threshold: 40,
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: false
    },
    getRandomTime: () => {
      const hour = getRandomInt(1, 13);
      const minute = getRandomInt(0, 60);
      return [hour, minute];
    }
  }
];

const GameView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);
  const [level, setLevel] = useState<Level>(getLevelAccordingToTotalPoints(user.totalPoints));

  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);

  const result = useRef<string>('');

  useEffect(() => {
    const [rndHour, rndMinute] = level.getRandomTime();
    setHour(rndHour);
    setMinute(rndMinute);
    result.current = '';
  }, [level]);

  const germanTime = timeToGerman(hour, minute);
  const solutionString = germanTime.toLowerCase();
  const availableWords = Object.values(
    shuffleArray([
      ...solutionString.split(' '),
      ...pickRandom(minuteNamesLc, 2),
      ...pickRandom(hourNamesLc, 2),
      ...pickRandom(addWordsLc, 2)
    ])
      .filter((s) => !!s)
      .reduce((tot: Record<string, string>, curr) => {
        tot[curr] = curr;
        return tot;
      }, {})
  );

  // console.log(hour, minute, germanTime, solutionString);
  console.log(level);

  return (
    <div className={styles.gameView}>
      <div className={cStyles.gridRow}>
        <h4
          onClick={() => {
            const [rndHour, rndMinute] = level.getRandomTime();
            setHour(rndHour);
            setMinute(rndMinute);
          }}
        >
          {level.title}
        </h4>
      </div>

      <div className={cStyles.gridRow}>
        <div style={{width: 'min(90vmin,600px)', height: 'min(90vmin,600px)', aspectRatio: '1 / 1'}}>
          <AnalogClock readonly={true} hour={hour} minute={minute} config={level.clockConfig} />
        </div>
      </div>

      <div className={cStyles.gridRow}>
        <DraggablePills words={[...availableWords]} onChange={onPillsDragged} />
      </div>
      <div className={cStyles.growRow}>
        <Button onClick={onCheckClicked} primary={true}>
          Prüfen
        </Button>
      </div>

      <MainMenu />
    </div>
  );

  function onPillsDragged(words: string[]) {
    result.current = words.join(' ').toLowerCase();
  }

  function onCheckClicked() {
    if (result.current === solutionString) {
      const [rndHour, rndMinute] = level.getRandomTime();
      setHour(rndHour);
      setMinute(rndMinute);

      const newTotalPoints = user.totalPoints + level.pointFactor;

      setUser({
        ...user,
        totalPoints: newTotalPoints
      });
      // see if next level?
      const l = getLevelAccordingToTotalPoints(newTotalPoints);
      setLevel(l);
    }
  }

  function getLevelAccordingToTotalPoints(totalPoints: number): Level {
    const match = levels.findLast((lvl) => totalPoints >= lvl.threshold);
    return match || levels[0];
  }
};

export default GameView;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
  }
  return shuffled;
}

function pickRandom<T>(array: T[], n: number): T[] {
  const shuffled = [...array];
  const result: T[] = [];

  for (let i = 0; i < Math.min(n, array.length); i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    result.push(shuffled[randomIndex]);
    shuffled.splice(randomIndex, 1);
  }

  return result;
}
