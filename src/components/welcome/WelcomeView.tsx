import {useEffect, useState} from 'react';

import getRandomInt from '../../data/getRandomInt';
import {timeToGerman} from '../../data/timeToGerman';
import {useAppStore} from '../../state/store';
import AnalogClock from '../clock/AnalogClock';
import Button from '../commons/Button';
import {Checkbox} from '../commons/Checkbox';
import MainMenu from '../commons/MainMenu';
import * as cStyles from '../commons/_commons.css';
import * as styles from './WelcomeView.css';

const WelcomeView = () => {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

  const clockConfig = useAppStore((state) => state.clockConfig);
  const setClockConfig = useAppStore((state) => state.setClockConfig);

  const [timeTextShown, setTimeTextShown] = useState<boolean>(false);

  useEffect(() => {
    setTimeTextShown(false);
  }, [hour, minute]);

  return (
    <div className={styles.welcomeView}>
      <div className={cStyles.gridRow}>
        <Button onClick={onJetztClicked} primary={true}>
          <i className="icon icon-clock" /> Jetzt
        </Button>
        <Button onClick={onRandomClicked} primary={true}>
          <i className="icon icon-arrows-ccw" /> Zufällig
        </Button>
      </div>

      <div className={cStyles.gridRow}>
        <div style={{width: 'min(90vmin,600px)', height: 'min(90vmin,600px)', aspectRatio: '1 / 1'}}>
          <AnalogClock
            hour={hour}
            minute={minute}
            config={clockConfig}
            startChanging={() => setTimeTextShown(false)}
            onChange={onClockNewTimeSet}
          />
        </div>
      </div>

      <div className={cStyles.gridRow}>
        <Button onClick={() => setTimeTextShown(true)} primary={true}>
          <i className="icon icon-eye" /> Zeit als Text anzeigen
        </Button>
      </div>

      <div className={styles.timeText}>
        <h4>{timeTextShown ? getTimeAsText() : <i className="icon icon-star" />}</h4>
      </div>

      <div className={cStyles.gridRow}>
        <Checkbox
          label="Minuten"
          value={clockConfig.showMinuteNumbers}
          onChange={() => {
            const newClockConfig = {
              ...clockConfig,
              showMinuteNumbers: !clockConfig.showMinuteNumbers
            };
            if (newClockConfig.showMinuteNumbers) {
              newClockConfig.showMinuteTicks = false;
            }
            setClockConfig(newClockConfig);
          }}
        />
        <Checkbox
          label="Minuten-Ticks"
          value={clockConfig.showMinuteTicks}
          onChange={() => {
            const newClockConfig = {
              ...clockConfig,
              showMinuteTicks: !clockConfig.showMinuteTicks
            };
            if (newClockConfig.showMinuteTicks) {
              newClockConfig.showMinuteNumbers = false;
            }
            setClockConfig(newClockConfig);
          }}
        />
      </div>
      <div className={cStyles.growRow}>
        <Checkbox
          label="12h"
          value={clockConfig.show12HourNumbers}
          onChange={() =>
            setClockConfig({
              ...clockConfig,
              show12HourNumbers: !clockConfig.show12HourNumbers
            })
          }
        />
        <Checkbox
          label="24h"
          value={clockConfig.show24HourNumbers}
          onChange={() =>
            setClockConfig({
              ...clockConfig,
              show24HourNumbers: !clockConfig.show24HourNumbers
            })
          }
        />
      </div>

      <MainMenu />
    </div>
  );

  function getTimeAsText() {
    const h12 = hour > 11 ? hour - 12 : hour;
    const h24 = hour < 12 ? hour + 12 : hour;
    const m = String(minute).padStart(2, '0');
    return `${h12}:${m} | ${h24}:${m} | ${timeToGerman(hour, minute)}`;
  }

  function onJetztClicked() {
    setHour(new Date().getHours());
    setMinute(new Date().getMinutes());
  }

  function onRandomClicked() {
    setHour(getRandomInt(1, 13));
    setMinute(getRandomInt(0, 60));
  }

  function onClockNewTimeSet(hour: number, minute: number) {
    console.log('new time set', hour, minute);
    setHour(hour);
    setMinute(minute);
  }
};

export default WelcomeView;
