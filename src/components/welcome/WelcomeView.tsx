import AnalogClock from '../clock/AnalogClock';
import {welcomeView} from './WelcomeView.css';

const WelcomeView = () => {
  const now = new Date();

  return (
    <div className={welcomeView}>
      <h2>Welcome</h2>
      <AnalogClock hour={now.getHours()} minute={now.getMinutes()} />
      <AnalogClock hour={7} minute={5} />
      <AnalogClock hour={11} minute={38} />
      <AnalogClock hour={12} minute={0} />
      <AnalogClock hour={4} minute={0} />
      <AnalogClock hour={11} minute={55} />
    </div>
  );
};

export default WelcomeView;
