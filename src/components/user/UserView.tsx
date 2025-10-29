import {useEffect, useState} from 'react';

import {useAppStore} from '../../state/store';
import {selectUserOrThrow} from '../../state/user/userSelectors';
import Button from '../commons/Button';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './UserView.css';

const UserView = () => {
  const user = useAppStore(selectUserOrThrow);
  const setUser = useAppStore((state) => state.setUser);

  const [myName, setMyName] = useState<string>(user.name);
  useEffect(() => {
    setMyName(user.name);
  }, [user]);

  return (
    <div className={styles.userView}>
      <div className={cStyles.gridRow}></div>

      <div className={cStyles.gridRow}>
        <input type="text" id="name" value={myName} onChange={onUserNameChange} onBlur={onUserNameBlur} />
      </div>

      <div className={cStyles.growRow}>
        <i className="icon icon-star" /> {user.totalPoints || 0}
      </div>

      <div className={cStyles.gridRow}>
        <Button onClick={resetPoints}>Punkte Zurücksetzen!</Button>
      </div>
      <MainMenu />
    </div>
  );

  function resetPoints() {
    setUser({
      ...user,
      totalPoints: 0
    });
  }

  function onUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMyName(e.target.value);
  }

  function onUserNameBlur() {
    setUser({
      ...user,
      name: myName || user.name
    });
  }
};

export default UserView;
