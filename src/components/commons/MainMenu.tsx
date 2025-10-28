import {Link} from 'wouter';

import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import * as styles from './MainMenu.css';

const MainMenu = () => {
  const user = useAppStore(selectUserOrThrow);

  return (
    <div className={styles.mainMenu}>
      <div></div>

      <div>
        <Link href="/">
          <i className="icon icon-home" /> Start
        </Link>
        <Link href="/game">
          <i className="icon icon-trophy" /> Spiel
        </Link>
        <Link href="/user">
          <i className="icon icon-user" /> Profil
        </Link>
      </div>

      <div>
        <i className="icon icon-star" /> {user.totalPoints || 0}
      </div>
    </div>
  );
};

export default MainMenu;
