import Levels from '../../data/levels';
import Level from '../../domain/Level';
import * as styles from './LevelList.css';

interface LevelListProps {
  currentLevel: Level;
}

const LevelList = ({currentLevel}: LevelListProps) => {
  return (
    <div className={styles.levelListContainer}>
      <ol>
        {Levels.map((level) => (
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
