import BaseLevel from '../../domain/BaseLevel';
import * as styles from './LevelList.css';

interface LevelListProps {
  levels: BaseLevel[];
  currentLevel: BaseLevel;
}

const LevelList = ({levels, currentLevel}: LevelListProps) => {
  return (
    <div className={styles.levelListContainer}>
      <ol>
        {levels.map((level) => (
          <li
            key={`lvl:${level.threshold}`}
            className={currentLevel.threshold === level.threshold ? styles.highlighted : ''}
          >
            {currentLevel.threshold === level.threshold && <i className="icon icon-star" />}
            {level.title} - {level.threshold} (x{level.pointFactor})
            {currentLevel.threshold === level.threshold && <i className="icon icon-star" />}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LevelList;
