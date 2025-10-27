import {useEffect, useRef, useState} from 'react';

import * as styles from './AnalogClock.css';

export const CLOCK_OUTER_SIZE = 400;

interface AnalogClockProps {
  hour: number;
  minute: number;

  showMinutesNumbers?: boolean;
  show24HourNumbers?: boolean;
  onChange?: (hour: number, minute: number) => void;
}

const AnalogClock = ({hour, minute, showMinutesNumbers, show24HourNumbers, onChange}: AnalogClockProps) => {
  const [myHour, setMyHour] = useState<number>(hour);
  const [myMinute, setMyMinute] = useState<number>(minute);

  const clockRef = useRef<HTMLDivElement>(null);
  const [draggingHand, setDraggingHand] = useState<'hour' | 'minute' | null>(null);

  // Calculate rotation angles
  // Hour hand: 30 degrees per hour + 0.5 degrees per minute
  const hourAngle = (myHour % 12) * 30 + myMinute * 0.5;

  // Minute hand: 6 degrees per minute
  const minuteAngle = myMinute * 6;

  // Generate clock hour numbers (1-12)
  const hourNumbers = Array.from({length: 12}, (_, i) => i + 1);
  const hourNumbers24 = Array.from({length: 12}, (_, i) => 12 + i + 1);
  const minuteNumbers = Array.from({length: 60}, (_, i) => i + 1);

  useEffect(() => {
    setMyHour(hour);
    setMyMinute(minute);
  }, [hour, minute]);

  // Add and remove event listeners
  useEffect(() => {
    if (draggingHand && clockRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingHand, hour, minute, onChange]);

  return (
    <div ref={clockRef} className={styles.clockContainer}>
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
        style={{transform: `translateX(-50%) rotate(${hourAngle}deg)`, cursor: 'pointer'}}
        onMouseDown={() => setDraggingHand('hour')}
      />

      {/* Minute hand */}
      <div
        className={`${styles.hand} ${styles.minuteHand}`}
        style={{transform: `translateX(-50%) rotate(${minuteAngle}deg)`, cursor: 'pointer'}}
        onMouseDown={() => setDraggingHand('minute')}
      />

      {/* Center dot */}
      <div className={styles.clockCenter} />
    </div>
  );

  function getAngleFromMouse(e: MouseEvent): number {
    if (!clockRef.current) return 0;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate angle in degrees (0 is at 3 o'clock, going counter-clockwise)
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // Convert to 12 o'clock = 0, going clockwise
    angle = angle + 90;
    if (angle < 0) angle += 360;

    return angle;
  }

  function getMinuteFromMouse(e: MouseEvent) {
    return Math.round(getAngleFromMouse(e) / 6) % 60; // Each minute is 6 degrees
  }

  function getHourFromMouse(e: MouseEvent) {
    return Math.round(getAngleFromMouse(e) / 30) % 12; // Each hour is 30 degrees
  }

  function handleMouseMove(e: MouseEvent) {
    if (!draggingHand) {
      return;
    }

    if (draggingHand === 'minute') {
      setMyMinute(getMinuteFromMouse(e));
    } else if (draggingHand === 'hour') {
      setMyHour(getHourFromMouse(e));
    }
  }

  function handleMouseUp(e: MouseEvent) {
    if (draggingHand === 'minute') {
      onChange?.(myHour, getMinuteFromMouse(e));
    } else if (draggingHand === 'hour') {
      onChange?.(getHourFromMouse(e), myMinute);
    }

    setDraggingHand(null);
  }
};

export default AnalogClock;

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
