import {useEffect, useRef, useState} from 'react';

import * as styles from './AnalogClock.css';

export const CLOCK_OUTER_SIZE = 600;

interface AnalogClockProps {
  hour: number;
  minute: number;
  showMinutesNumbers?: boolean;
  showMinutesTicks?: boolean;
  show12HourNumbers?: boolean;
  show24HourNumbers?: boolean;
  onChange?: (hour: number, minute: number) => void;
  startChanging?: () => void;
}

const AnalogClock = ({
  hour,
  minute,
  showMinutesNumbers,
  showMinutesTicks,
  show12HourNumbers,
  show24HourNumbers,
  startChanging,
  onChange
}: AnalogClockProps) => {
  const [myHour, setMyHour] = useState<number>(hour);
  const [myMinute, setMyMinute] = useState<number>(minute);

  const clockRef = useRef<HTMLDivElement>(null);
  const [draggingHand, setDraggingHand] = useState<'hour' | 'minute' | null>(null);
  const previousMinuteRef = useRef<number>(minute);
  const currentHourRef = useRef<number>(hour);
  const [scale, setScale] = useState<number>(1);

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
    previousMinuteRef.current = minute;
    currentHourRef.current = hour;
  }, [hour, minute]);

  // Add and remove event listeners
  useEffect(() => {
    if (draggingHand && clockRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, {passive: false});
      window.addEventListener('touchend', handleTouchEnd, {passive: false});

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [draggingHand, hour, minute, onChange]);

  // Calculate scale factor based on viewport dimensions
  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const minDimension = Math.min(viewportWidth, viewportHeight);

      // Use 90% of the smallest viewport dimension, but never scale up beyond 1
      const maxSize = minDimension * 0.9;
      const newScale = Math.min(1, maxSize / CLOCK_OUTER_SIZE);

      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div
      ref={clockRef}
      className={styles.clockContainer}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center'
      }}
    >
      {/* Clock numbers */}
      {show12HourNumbers &&
        hourNumbers.map((num) => (
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

      {showMinutesTicks &&
        minuteNumbers.map((num, index) => (
          <div
            key={num}
            className={styles.ticksMinutes}
            style={{...getMinuteTicksPosition(num), transform: `rotate(${(index + 1) * 6}deg)`}}
          ></div>
        ))}

      {/* Hour hand */}
      <div
        className={styles.hourHand}
        style={{transform: `translateX(-50%) rotate(${hourAngle}deg)`, cursor: 'pointer'}}
        onMouseDown={() => onStartDragging('hour')}
        onTouchStart={() => onStartDragging('hour')}
      />

      {/* Minute hand */}
      <div
        className={styles.minuteHand}
        style={{transform: `translateX(-50%) rotate(${minuteAngle}deg)`, cursor: 'pointer'}}
        onMouseDown={() => onStartDragging('minute')}
        onTouchStart={() => onStartDragging('minute')}
      />

      {/* Center dot */}
      <div className={styles.clockCenter} />
    </div>
  );

  function onStartDragging(hand: 'hour' | 'minute') {
    startChanging?.();
    setDraggingHand(hand);
    previousMinuteRef.current = myMinute;
    currentHourRef.current = myHour;
  }

  function updateMinuteAndCheckHourChange(newMinute: number) {
    const prevMinute = previousMinuteRef.current;

    // Detect crossing the 12 o'clock position
    // Clockwise: from high minutes (55-59) to low minutes (0-5)
    if (prevMinute >= 55 && newMinute <= 5) {
      // Crossed 12 clockwise, increment hour
      const newHour = (currentHourRef.current + 1) % 24;
      setMyHour(newHour);
      currentHourRef.current = newHour;
    }
    // Counter-clockwise: from low minutes (0-5) to high minutes (55-59)
    else if (prevMinute <= 5 && newMinute >= 55) {
      // Crossed 12 counter-clockwise, decrement hour
      const newHour = (currentHourRef.current - 1 + 24) % 24;
      setMyHour(newHour);
      currentHourRef.current = newHour;
    }

    setMyMinute(newMinute);
    previousMinuteRef.current = newMinute;
  }

  function isOutsideClockArea(clientX: number, clientY: number): boolean {
    if (!clockRef.current) return false;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Check if distance is beyond the clock radius (including some margin)
    // Account for scale factor
    const clockRadius = (CLOCK_OUTER_SIZE / 2 + 20) * scale; // Add 20px margin, multiply by scale
    return distance > clockRadius;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!draggingHand) {
      return;
    }

    if (isOutsideClockArea(e.clientX, e.clientY)) {
      handleMouseUp(e);
      return;
    }

    if (draggingHand === 'minute') {
      updateMinuteAndCheckHourChange(getMinuteFromMouse(e));
    } else if (draggingHand === 'hour') {
      const newHour = getHourFromMouse(e);
      setMyHour(newHour);
      currentHourRef.current = newHour;
    }
  }

  function handleMouseUp(e: MouseEvent) {
    if (draggingHand === 'minute') {
      onChange?.(currentHourRef.current, getMinuteFromMouse(e));
    } else if (draggingHand === 'hour') {
      onChange?.(getHourFromMouse(e), myMinute);
    }

    setDraggingHand(null);
  }

  function handleTouchMove(e: TouchEvent) {
    if (!draggingHand) {
      return;
    }

    e.preventDefault();

    // Stop dragging if touch leaves clock area
    const touch = e.touches[0];
    if (touch && isOutsideClockArea(touch.clientX, touch.clientY)) {
      handleTouchEnd(e);
      return;
    }

    if (draggingHand === 'minute') {
      updateMinuteAndCheckHourChange(getMinuteFromTouch(e));
    } else if (draggingHand === 'hour') {
      const newHour = getHourFromTouch(e);
      setMyHour(newHour);
      currentHourRef.current = newHour;
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    e.preventDefault();

    if (draggingHand === 'minute') {
      onChange?.(currentHourRef.current, getMinuteFromTouch(e));
    } else if (draggingHand === 'hour') {
      onChange?.(getHourFromTouch(e), myMinute);
    }

    setDraggingHand(null);
  }

  function getAngleFromMouse(e: MouseEvent): number {
    return getAngleFromPosition(e.clientX, e.clientY);
  }

  function getAngleFromTouch(e: TouchEvent): number {
    const touch = e.touches[0] || e.changedTouches[0];
    return getAngleFromPosition(touch.clientX, touch.clientY);
  }

  function getMinuteFromMouse(e: MouseEvent) {
    return Math.round(getAngleFromMouse(e) / 6) % 60; // Each minute is 6 degrees
  }

  function getHourFromMouse(e: MouseEvent) {
    return Math.round(getAngleFromMouse(e) / 30) % 12; // Each hour is 30 degrees
  }

  function getMinuteFromTouch(e: TouchEvent) {
    return Math.round(getAngleFromTouch(e) / 6) % 60; // Each minute is 6 degrees
  }

  function getHourFromTouch(e: TouchEvent) {
    return Math.round(getAngleFromTouch(e) / 30) % 12; // Each hour is 30 degrees
  }

  function getAngleFromPosition(clientX: number, clientY: number): number {
    if (!clockRef.current) {
      return 0;
    }

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate angle in degrees (0 is at 3 o'clock, going counter-clockwise)
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // Convert to 12 o'clock = 0, going clockwise
    angle = angle + 90;
    if (angle < 0) angle += 360;

    return angle;
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

const getMinuteTicksPosition = (num: number) => {
  const angle = ((num * 6 - 90) * Math.PI) / 180; // Convert to radians, -90 to start at 12 o'clock, 6 degrees per minute
  const radius = CLOCK_OUTER_SIZE * 0.48; // Distance from center
  const center = CLOCK_OUTER_SIZE / 2;
  const x = center + radius * Math.cos(angle) - 2;
  const y = center + radius * Math.sin(angle) - 5;
  return {left: `${x}px`, top: `${y}px`};
};
