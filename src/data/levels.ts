import Level from '../domain/Level';
import getRandomInt from './getRandomInt';

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

export default levels;


export function getMatchingLevelForPoints(totalPoints: number): Level {
  const match = levels.findLast((lvl) => totalPoints >= lvl.threshold);
  return match || levels[0];
}

export function getGapToNextLevel(totalPoints: number): number {
  const matchIndex = levels.findLastIndex((lvl) => totalPoints >= lvl.threshold);

  if (matchIndex < 0) {
    return levels[1].threshold - totalPoints;
  }

  if (matchIndex === levels.length - 1) {
    return 0
  }


  return levels[matchIndex + 1].threshold - totalPoints;
}
