import {Link} from 'wouter';

import {useAppStore} from '../../state/store';
import {selectTotalPoints} from '../../state/user/userSelectors';
import * as styles from './MainMenu.css';

const MainMenu = () => {
  const totalPoints = useAppStore(selectTotalPoints);

  return (
    <div className={styles.mainMenu}>
      <div></div>

      <div>
        <Link href="/">
          <i className="icon icon-home" /> Start
        </Link>
        <Link href="/game-analog-clock">
          <i className="icon icon-trophy" /> Spiel 1
        </Link>
        <Link href="/game-digital-clock">
          <i className="icon icon-trophy" /> Spiel 2
        </Link>
        <Link href="/user">
          <i className="icon icon-user" /> Profil
        </Link>
      </div>

      <div>
        <i className="icon icon-star" /> {totalPoints || 0}
      </div>
    </div>
  );
};

export default MainMenu;
