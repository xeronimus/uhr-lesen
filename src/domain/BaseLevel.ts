export default interface BaseLevel {
  title: string;

  /*
  higher levels earn more points. a correct solution is multiplied with this factor
   */
  pointFactor: number;

  /*
  the amount of points a user must have so that this level is available
   */
  threshold: number;

  levelIndex: number;
}

export function assureLevelConsistency(levels: BaseLevel[]) {
  let prevPointThreshold: number | undefined;

  console.log(levels);

  if (!levels.length) {
    throw new Error(`No levels defined`);
  }

  if (levels[0].threshold !== 0) {
    throw new Error(`First level must have threshold of 0`);
  }

  levels.forEach((level, index) => {
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

export function getUserLevelInfoForPoints<T extends BaseLevel>(levels: T[], userPoints: number): [T, number] {
  return [getMatchingLevelForPoints(levels, userPoints), getGapToNextLevel(levels, userPoints)];
}

export function getMatchingLevelForPoints<T extends BaseLevel>(levels: T[], userPoints: number): T {
  const match = levels.findLast((lvl) => userPoints >= lvl.threshold);
  return match || levels[0];
}

export function getGapToNextLevel<T extends BaseLevel>(levels: T[], userPoints: number): number {
  const matchIndex = levels.findLastIndex((lvl) => userPoints >= lvl.threshold);

  if (matchIndex < 0) {
    return levels[1].threshold - userPoints;
  }

  if (matchIndex === levels.length - 1) {
    return 0;
  }

  return levels[matchIndex + 1].threshold - userPoints;
}
