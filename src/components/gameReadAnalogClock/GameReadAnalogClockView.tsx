import {useEffect, useRef, useState} from 'react';

import {addWordsLc, hourNamesLc, minuteNamesLc, timeToGerman} from '../../data/timeToGerman';
import {getMatchingLevelForPoints} from '../../domain/BaseLevel';
import ReadAnalogClockLevel, {sortedLevels as levels} from '../../domain/ReadAnalogClockLevel';
import {updatePointsInUserPointsArray} from '../../domain/User';
import envConfig from '../../envConfig';
import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import AnalogClock from '../clock/AnalogClock';
import Button from '../commons/Button';
import Celebration from '../commons/Celebration';
import DraggablePills from '../commons/DraggablePills';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './GameReadAnalogClockView.css';

const GameReadAnalogClockView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);
  const [level, setLevel] = useState<ReadAnalogClockLevel>(getMatchingLevelForPoints(levels, user.points[0]));

  const [celebrEffectPointsVisible, setCelebrEffectPointsVisible] = useState<boolean>(false);
  const [celebrEffectLevelVisible, setCelebrEffectLevelVisible] = useState<boolean>(false);

  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [correctSolution, setCorrectSolution] = useState<string>('');
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const usersResultRef = useRef<string>(''); // no need to rerender when user drags words, can be a ref.
  const audioRef = useRef<HTMLAudioElement>(null);

  function setNewTimeTask() {
    const [rndHour, rndMinute] = level.getRandomTime();
    setHour(rndHour);
    setMinute(rndMinute);
    usersResultRef.current = '';

    const germanTime = timeToGerman(rndHour, rndMinute);
    const solutionString = germanTime.toLowerCase();
    setCorrectSolution(solutionString);
    setAvailableWords(getAvailableWords(solutionString));
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
        <h4 onClick={setNewTimeTask}>Spiel 1 : {level.title}</h4>
      </div>

      <div className={cStyles.gridRow}>
        <div style={{width: 'min(90vmin,600px)', height: 'min(90vmin,600px)', aspectRatio: '1 / 1'}}>
          <AnalogClock readonly={true} hour={hour} minute={minute} config={level.clockConfig} />
        </div>
      </div>

      <div className={cStyles.gridRow}>{hour >= 12 && <span className={styles.hintText}>Nachmittag / Abend</span>}</div>
      <div className={cStyles.gridRow}>
        <DraggablePills words={availableWords} onChange={onPillsDragged} />
      </div>
      <div className={cStyles.growRow}>
        <Button onClick={onCheckClicked} primary={true}>
          Prüfen
        </Button>

        {envConfig.isDev && (
          <span>
            {hour}:{minute}
          </span>
        )}
      </div>

      <MainMenu />
    </div>
  );

  function onPillsDragged(words: string[]) {
    usersResultRef.current = words.join(' ').toLowerCase();
  }

  function onCheckClicked() {
    if (usersResultRef.current === correctSolution) {
      setNewTimeTask();

      const newTotalPoints = user.points[0] + level.pointFactor;

      setUser({
        ...user,
        points: updatePointsInUserPointsArray(user.points, 0, newTotalPoints)
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

export default GameReadAnalogClockView;

/**
 * get list of available words. will of course include the words of the given solution string (the correct time as text)
 */
function getAvailableWords(solutionString: string): string[] {
  const mustBeInThere = solutionString.split(' ');
  const all = uniqueStringArray([
    ...mustBeInThere,
    ...pickRandom(minuteNamesLc, 2),
    ...pickRandom(hourNamesLc, 2),
    ...pickRandom(addWordsLc, 2),
    'nach',
    'vor'
  ]);

  return shuffleArray(all)
    .filter((s) => !!s)
    .map((w) => w.toLowerCase());
}

function uniqueStringArray(arr: string[]) {
  return Object.values(
    arr.reduce((tot: Record<string, string>, curr) => {
      tot[curr] = curr;
      return tot;
    }, {})
  );
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
