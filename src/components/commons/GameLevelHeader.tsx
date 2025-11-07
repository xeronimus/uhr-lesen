import BaseLevel from '../../domain/BaseLevel';
import * as styles from './GameLevelHeader.css';
import IconButton from './IconButton';
import * as cStyles from './_commons.css';

interface GameLevelHeaderProps {
  level: BaseLevel;
  maxLevel: BaseLevel;
  onSetNewTimeTask: () => void;
  onLevelBackClick: (newLevelIndex: number) => void;
  onLevelForwardClick: (newLevelIndex: number) => void;
}

const GameLevelHeader = ({
  level,
  maxLevel,
  onLevelBackClick,
  onLevelForwardClick,
  onSetNewTimeTask
}: GameLevelHeaderProps) => {
  return (
    <div className={[cStyles.gridRow, styles.gameLevelHeader].join(' ')}>
      <h4>
        <IconButton iconClass={`icon-left-dir`} onClick={onBackClick} disabled={level.levelIndex < 1} />
        <span onClick={onSetNewTimeTask}>{level.title}</span>
        <IconButton
          iconClass="icon-right-dir"
          onClick={onForwardClick}
          disabled={level.levelIndex >= maxLevel.levelIndex}
        />
      </h4>
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
