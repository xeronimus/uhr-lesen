import {useEffect, useRef, useState} from 'react';

import {getMatchingLevelForPoints} from '../../data/levels';
import {addWordsLc, hourNamesLc, minuteNamesLc, timeToGerman} from '../../data/timeToGerman';
import Level from '../../domain/Level';
import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import AnalogClock from '../clock/AnalogClock';
import Button from '../commons/Button';
import DraggablePills from '../commons/DraggablePills';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './GameView.css';

const GameView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);
  const [level, setLevel] = useState<Level>(getMatchingLevelForPoints(user.totalPoints));

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
  const availableWords = getAvailableWords(solutionString);


  //  console.log(hour, minute, germanTime, solutionString);
  // console.log(level);

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
          <AnalogClock readonly={true} hour={hour} minute={minute} config={level.clockConfig}/>
        </div>
      </div>

      <div className={cStyles.gridRow}>
        <DraggablePills words={[...availableWords]} onChange={onPillsDragged}/>
      </div>
      <div className={cStyles.growRow}>
        <Button onClick={onCheckClicked} primary={true}>
          Prüfen
        </Button>
      </div>

      <MainMenu/>
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
      const l = getMatchingLevelForPoints(newTotalPoints);
      setLevel(l);
    }
  }


};

export default GameView;


function getAvailableWords(solutionString: string) {
  const mustBeInThere = solutionString.split(' ');
  const additionalWords = uniqueStringArray([
    ...pickRandom(minuteNamesLc, 2),
    ...pickRandom(hourNamesLc, 2),
    ...pickRandom(addWordsLc, 2),
    'vor',
    'nach'
  ]);

  return shuffleArray([
      ...additionalWords,
      ...mustBeInThere
    ]
  ).filter((s) => !!s);

}

function uniqueStringArray(arr: string[]) {
  return Object.values(arr
    .reduce((tot: Record<string, string>, curr) => {
      tot[curr] = curr;
      return tot;
    }, {}))
}

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
