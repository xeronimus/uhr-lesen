import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './GameView.css';

const GameView = () => {
  return (
    <div className={styles.gameView}>
      <div className={cStyles.gridRow}></div>
      <div className={cStyles.growRow}></div>

      <MainMenu />
    </div>
  );
};

export default GameView;
