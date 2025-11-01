import {getRandomHour12, getRandomHour24, getRandomInt, getRandomMinute} from '../data/getRandomTimes';
import AnalogClockConfig from './AnalogClockConfig';
import BaseLevel, {assureLevelConsistency} from './BaseLevel';

export default interface ReadDigitalClockLevel extends BaseLevel {
  clockConfig: AnalogClockConfig;
  getRandomTime: () => [number, number];
}

const levelsRaw: ReadDigitalClockLevel[] = [
  {
    title: 'Level 1',
    pointFactor: 1,
    threshold: 0,
    levelIndex: 0,
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
    levelIndex: 0,
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
    levelIndex: 0,
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
    levelIndex: 0,
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
    levelIndex: 0,
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

export const sortedLevels = [...levelsRaw]
  .sort((l1: BaseLevel, l2: BaseLevel) => l1.threshold - l2.threshold)
  .map((l, i) => {
    l.levelIndex = i;
    return l;
  });

assureLevelConsistency(sortedLevels);
