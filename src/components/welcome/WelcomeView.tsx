import {useState} from 'react';

import AnalogClock from '../clock/AnalogClock';
import {Checkbox} from '../commons/Checkbox';
import {welcomeView} from './WelcomeView.css';
import {gridRow} from "../commons/_commons.css";
import Button from "../commons/Button";

const WelcomeView = () => {

  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

  const [showMinuteNumbers, setShowMinuteNumbers] = useState<boolean>(true);
  const [show24HourNumbers, setShow24HourNumbers] = useState<boolean>(true);

  return (
    <div className={welcomeView}>

      <div className={gridRow}>
        <AnalogClock
          hour={hour}
          minute={minute}
          showMinutesNumbers={showMinuteNumbers}
          show24HourNumbers={show24HourNumbers}
          onChange={onClockNewTimeSet}
        />


        <div>

          <Button onClick={onJetztClicked} primary={true}>Jetzt</Button>
        </div>

      </div>

      <div>
        <Checkbox label="Minuten" value={showMinuteNumbers} onChange={() => setShowMinuteNumbers(!showMinuteNumbers)}/>
        <Checkbox label="24h" value={show24HourNumbers} onChange={() => setShow24HourNumbers(!show24HourNumbers)}/>
      </div>
    </div>
  );

  function onJetztClicked() {
    setHour(new Date().getHours());
    setMinute(new Date().getMinutes());
  }

  function onClockNewTimeSet(hour: number, minute: number) {
    console.log(hour, minute);
    setHour(hour);
    setMinute(minute);
  }
};

export default WelcomeView;
