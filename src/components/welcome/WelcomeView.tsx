import {useEffect, useState} from 'react';

import {timeToGerman} from '../../data/timeToGerman';
import AnalogClock from '../clock/AnalogClock';
import Button from '../commons/Button';
import {Checkbox} from '../commons/Checkbox';
import {gridRow} from '../commons/_commons.css';
import {timeText, welcomeView} from './WelcomeView.css';

const WelcomeView = () => {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

  const [showMinuteNumbers, setShowMinuteNumbers] = useState<boolean>(true);
  const [show24HourNumbers, setShow24HourNumbers] = useState<boolean>(false);

  const [timeTextShown, setTimeTextShown] = useState<boolean>(false);

  useEffect(() => {
    setTimeTextShown(false);
  }, [hour, minute]);

  return (
    <div className={welcomeView}>
      <div className={gridRow}>
        <AnalogClock
          hour={hour}
          minute={minute}
          showMinutesNumbers={showMinuteNumbers}
          show24HourNumbers={show24HourNumbers}
          startChanging={() => setTimeTextShown(false)}
          onChange={onClockNewTimeSet}
        />

        <div className={gridRow}>
          <Button onClick={onJetztClicked} primary={true}>
            Uhr auf jetzt einstellen
          </Button>
          <Button onClick={onRandomClicked} primary={true}>
            Uhr auf zufällige Zeit einstellen
          </Button>
          <Button onClick={() => setTimeTextShown(true)} primary={true}>
            Zeit als Text anzeigen
          </Button>
        </div>
      </div>

      <div className={timeText}>
        <h4>{timeTextShown ? timeToGerman(hour, minute) : '-'}</h4>
      </div>

      <div>
        <Checkbox label="Minuten" value={showMinuteNumbers} onChange={() => setShowMinuteNumbers(!showMinuteNumbers)} />
        <Checkbox label="24h" value={show24HourNumbers} onChange={() => setShow24HourNumbers(!show24HourNumbers)} />
      </div>
    </div>
  );

  function onJetztClicked() {
    setHour(new Date().getHours());
    setMinute(new Date().getMinutes());
  }

  function onRandomClicked() {
    setHour(getRandomInt(0, 13));
    setMinute(getRandomInt(0, 61));
  }

  function onClockNewTimeSet(hour: number, minute: number) {
    console.log(hour, minute);
    setHour(hour);
    setMinute(minute);
  }
};

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export default WelcomeView;
