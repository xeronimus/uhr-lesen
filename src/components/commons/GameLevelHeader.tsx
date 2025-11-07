import BaseLevel, {getMatchingLevelForPoints, progressInLevel} from '../../domain/BaseLevel';
import * as styles from './GameLevelHeader.css';
import IconButton from './IconButton';
import ProgressBar from './ProgressBar';

interface GameLevelHeaderProps {
  userPoints: number;
  level: BaseLevel; // can be different from the max possible level (resulting from the points), since the user can manually step back to a lower level
  levels: BaseLevel[];
  onSetNewTimeTask: () => void;
  onLevelBackClick: (newLevelIndex: number) => void;
  onLevelForwardClick: (newLevelIndex: number) => void;
}

const GameLevelHeader = ({
  levels,
  level,
  userPoints,
  onLevelBackClick,
  onLevelForwardClick,
  onSetNewTimeTask
}: GameLevelHeaderProps) => {
  const maxLevel = getMatchingLevelForPoints(levels, userPoints);

  return (
    <div className={styles.gameLevelHeader}>
      <div className={styles.spacer} />

      <h4>
        <IconButton iconClass={`icon-left-dir`} onClick={onBackClick} disabled={level.levelIndex < 1} />
        <span onClick={onSetNewTimeTask}>{level.title}</span>
        <IconButton
          iconClass="icon-right-dir"
          onClick={onForwardClick}
          disabled={level.levelIndex >= maxLevel.levelIndex}
        />
      </h4>

      <ProgressBar percentage={progressInLevel(level, levels, userPoints)} />
    </div>
  );

  function onBackClick() {
    if (level.levelIndex > 0) {
      onLevelBackClick(level.levelIndex - 1);
    }
  }

  function onForwardClick() {
    if (level.levelIndex < maxLevel.levelIndex) {
      onLevelForwardClick(level.levelIndex + 1);
    }
  }
};

export default GameLevelHeader;
