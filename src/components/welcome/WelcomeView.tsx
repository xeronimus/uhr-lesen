import {useEffect, useState} from 'react';

import {timeToGerman} from '../../data/timeToGerman';
import AnalogClock from '../clock/AnalogClock';
import BuildInfo from '../commons/BuildInfo';
import Button from '../commons/Button';
import {Checkbox} from '../commons/Checkbox';
import {gridRow, growRow} from '../commons/_commons.css';
import {timeText, welcomeView} from './WelcomeView.css';

const WelcomeView = () => {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

  const [showMinuteNumbers, setShowMinuteNumbers] = useState<boolean>(false);
  const [showMinuteTicks, setShowMinuteTicks] = useState<boolean>(true);
  const [show12HourNumbers, setShow12HourNumbers] = useState<boolean>(true);
  const [show24HourNumbers, setShow24HourNumbers] = useState<boolean>(false);

  const [timeTextShown, setTimeTextShown] = useState<boolean>(false);

  useEffect(() => {
    setTimeTextShown(false);
  }, [hour, minute]);

  return (
    <div className={welcomeView}>

      <div className={gridRow}>
        <Button onClick={onJetztClicked} primary={true}>
          Uhr auf jetzt einstellen
        </Button>
        <Button onClick={onRandomClicked} primary={true}>
          Uhr auf zufällige Zeit einstellen
        </Button>
      </div>


      <div className={gridRow}>


        <AnalogClock
          hour={hour}
          minute={minute}
          showMinutesNumbers={showMinuteNumbers}
          showMinutesTicks={showMinuteTicks}
          show12HourNumbers={show12HourNumbers}
          show24HourNumbers={show24HourNumbers}
          startChanging={() => setTimeTextShown(false)}
          onChange={onClockNewTimeSet}
        />

      </div>


      <div className={gridRow}>
        <Button onClick={() => setTimeTextShown(true)} primary={true}>
          Zeit als Text anzeigen
        </Button>
      </div>


      <div className={timeText}>
        <h4>{timeTextShown ? `${hour > 11 ? hour - 12 : hour}:${String(minute).padStart(2, '0')}    |  ${hour < 12 ? hour + 12 : hour}:${String(minute).padStart(2, '0')}` : '******'}</h4>
        <h4>{timeTextShown ? `${timeToGerman(hour, minute)}` : '******'}</h4>
      </div>

      <div className={growRow}>
        <Checkbox
          label="Minuten (zahlen)"
          value={showMinuteNumbers}
          onChange={() => {
            setShowMinuteNumbers(!showMinuteNumbers);
            if (!showMinuteNumbers) {
              setShowMinuteTicks(false)
            }
          }}
        />
        <Checkbox
          label="Minuten"
          value={showMinuteTicks}
          onChange={() => {
            setShowMinuteTicks(!showMinuteTicks);
            if (!showMinuteTicks) {
              setShowMinuteNumbers(false)
            }
          }}
        />
        <Checkbox label="12h" value={show12HourNumbers} onChange={() => setShow12HourNumbers(!show12HourNumbers)}/>
        <Checkbox label="24h" value={show24HourNumbers} onChange={() => setShow24HourNumbers(!show24HourNumbers)}/>
      </div>

      <div>
        <BuildInfo/>
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
    console.log('new time set', hour, minute);
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
