import * as styles from './AnalogClock.css';

export const CLOCK_OUTER_SIZE = 400;

interface AnalogClockProps {
  hour: number;
  minute: number;

  showMinutesNumbers?: boolean;
  show24HourNumbers?: boolean;
}

const AnalogClock = ({hour, minute, showMinutesNumbers, show24HourNumbers}: AnalogClockProps) => {
  // Calculate rotation angles
  // Hour hand: 30 degrees per hour + 0.5 degrees per minute
  const hourAngle = (hour % 12) * 30 + minute * 0.5;

  // Minute hand: 6 degrees per minute
  const minuteAngle = minute * 6;

  // Generate clock hour numbers (1-12)
  const hourNumbers = Array.from({length: 12}, (_, i) => i + 1);
  const hourNumbers24 = Array.from({length: 12}, (_, i) => 12 + i + 1);
  const minuteNumbers = Array.from({length: 60}, (_, i) => i + 1);

  const getHourNumberPosition = (num: number) => {
    const angle = ((num * 30 - 90) * Math.PI) / 180; // Convert to radians, -90 to start at 12 o'clock
    const radius = CLOCK_OUTER_SIZE * 0.42; // Distance from center
    const center = CLOCK_OUTER_SIZE / 2;
    const x = center + radius * Math.cos(angle) - 15; // -15 to center the 30px number element
    const y = center + radius * Math.sin(angle) - 15;
    return {left: `${x}px`, top: `${y}px`};
  };

  const get24HourNumberPosition = (num: number) => {
    const angle = (((num - 12) * 30 - 90) * Math.PI) / 180; // Convert to radians, -90 to start at 12 o'clock
    const radius = CLOCK_OUTER_SIZE * 0.32; // Distance from center
    const center = CLOCK_OUTER_SIZE / 2;
    const x = center + radius * Math.cos(angle) - 15; // -15 to center the 30px number element
    const y = center + radius * Math.sin(angle) - 15;
    return {left: `${x}px`, top: `${y}px`};
  };

  const getMinuteNumberPosition = (num: number) => {
    const angle = ((num * 6 - 90) * Math.PI) / 180; // Convert to radians, -90 to start at 12 o'clock, 6 degrees per minute
    const radius = CLOCK_OUTER_SIZE * 0.469; // Distance from center
    const center = CLOCK_OUTER_SIZE / 2;
    const x = center + radius * Math.cos(angle) - 15; // -15 to center the 30px number element
    const y = center + radius * Math.sin(angle) - 15;
    return {left: `${x}px`, top: `${y}px`};
  };

  return (
    <div className={styles.clockContainer}>
      {/* Clock numbers */}
      {hourNumbers.map((num) => (
        <div key={num} className={styles.numberHours} style={getHourNumberPosition(num)}>
          {num}
        </div>
      ))}

      {show24HourNumbers &&
        hourNumbers24.map((num) => (
          <div key={num} className={styles.numberHours24} style={get24HourNumberPosition(num)}>
            {num}
          </div>
        ))}

      {showMinutesNumbers &&
        minuteNumbers.map((num) => (
          <div key={num} className={styles.numberMinutes} style={getMinuteNumberPosition(num)}>
            {num}
          </div>
        ))}

      {/* Hour hand */}
      <div
        className={`${styles.hand} ${styles.hourHand}`}
        style={{transform: `translateX(-50%) rotate(${hourAngle}deg)`}}
      />

      {/* Minute hand */}
      <div
        className={`${styles.hand} ${styles.minuteHand}`}
        style={{transform: `translateX(-50%) rotate(${minuteAngle}deg)`}}
      />

      {/* Center dot */}
      <div className={styles.clockCenter} />
    </div>
  );
};

export default AnalogClock;
