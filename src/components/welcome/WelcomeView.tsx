import {useState} from 'react';

import AnalogClock from '../clock/AnalogClock';
import {Checkbox} from '../commons/Checkbox';
import {welcomeView} from './WelcomeView.css';

const WelcomeView = () => {
  const now = new Date();

  const [showMinuteNumbers, setShowMinuteNumbers] = useState<boolean>(true);
  const [show24HourNumbers, setShow24HourNumbers] = useState<boolean>(true);

  return (
    <div className={welcomeView}>
      <h2>Welcome</h2>
      <AnalogClock
        hour={now.getHours()}
        minute={now.getMinutes()}
        showMinutesNumbers={showMinuteNumbers}
        show24HourNumbers={show24HourNumbers}
        onChange={onClockNewTimeSet}
      />

      <div>
        <Checkbox label="Minuten" value={showMinuteNumbers} onChange={() => setShowMinuteNumbers(!showMinuteNumbers)} />
        <Checkbox label="24h" value={show24HourNumbers} onChange={() => setShow24HourNumbers(!show24HourNumbers)} />
      </div>
    </div>
  );

  function onClockNewTimeSet(hour: number, minute: number) {
    console.log(hour, minute);
  }
};

export default WelcomeView;
