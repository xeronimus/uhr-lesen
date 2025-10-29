import Level from '../domain/Level';
import {getRandomHour12, getRandomHour24, getRandomInt, getRandomMinute} from './getRandomTimes';

const levelsRaw: Level[] = [
  {
    // minute will always be quarter after or half past or quarter to or "full hour"
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
      const hour = getRandomHour12();
      return [hour, minute];
    }
  },
  {
    // minute in 10-minute steps (10 after, 20 minutes after, 20 minutes to ...)
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
      const hour = getRandomHour12();
      return [hour, minute];
    }
  },
  // all minutes possible
  {
    title: 'Level 3',
    pointFactor: 4,
    threshold: 30,
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: false
    },
    getRandomTime: () => {
      const minute = getRandomMinute();
      const hour = getRandomHour12();
      return [hour, minute];
    }
  },

  // all minutes possible, show minute ticks, not numbers
  {
    title: 'Level 4',
    pointFactor: 8,
    threshold: 70,
    clockConfig: {
      showMinuteNumbers: false,
      showMinuteTicks: true,
      show12HourNumbers: true,
      show24HourNumbers: false
    },
    getRandomTime: () => {
      const hour = getRandomHour12();
      const minute = getRandomMinute();
      return [hour, minute];
    }
  },

  // now including afternoon, numbers 12 - 23 shown
  {
    title: 'Level 5',
    pointFactor: 10,
    threshold: 150,
    clockConfig: {
      showMinuteNumbers: true,
      showMinuteTicks: false,
      show12HourNumbers: true,
      show24HourNumbers: true
    },
    getRandomTime: () => {
      const hour = getRandomHour24();
      const minute = getRandomMinute();
      return [hour, minute];
    }
  }
];

const sortedLevels = [...levelsRaw].sort((l1, l2) => l1.threshold - l2.threshold);
export default sortedLevels;

assureLevelConsistency();

function assureLevelConsistency() {
  let prevPointThreshold: number | undefined;

  console.log(sortedLevels);

  if (!sortedLevels.length) {
    throw new Error(`No levels defined`);
  }

  if (sortedLevels[0].threshold !== 0) {
    throw new Error(`First level must have threshold of 0`);
  }

  sortedLevels.forEach((level, index) => {
    if (prevPointThreshold === undefined) {
      prevPointThreshold = level.threshold;
      return;
    }

    if (prevPointThreshold >= level.threshold) {
      throw new Error(
        `Level "${level.title}" (at index ${index}) has threshold ${level.threshold}, but previous threshold was ${prevPointThreshold}`
      );
    }

    prevPointThreshold = level.threshold;
  });
}

export function getMatchingLevelForPoints(totalPoints: number): Level {
  const match = sortedLevels.findLast((lvl) => totalPoints >= lvl.threshold);
  return match || sortedLevels[0];
}

export function getGapToNextLevel(totalPoints: number): number {
  const matchIndex = sortedLevels.findLastIndex((lvl) => totalPoints >= lvl.threshold);

  if (matchIndex < 0) {
    return sortedLevels[1].threshold - totalPoints;
  }

  if (matchIndex === sortedLevels.length - 1) {
    return 0;
  }

  return sortedLevels[matchIndex + 1].threshold - totalPoints;
}
