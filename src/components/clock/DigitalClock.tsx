import * as styles from './DigitalClock.css';

interface DigitalClockProps {
  hour: number;
  minute: number;
}

// Seven-segment display mapping: which segments to light for each digit
const segmentMap: Record<string, Set<string>> = {
  '0': new Set(['a', 'b', 'c', 'd', 'e', 'f']),
  '1': new Set(['b', 'c']),
  '2': new Set(['a', 'b', 'd', 'e', 'g']),
  '3': new Set(['a', 'b', 'c', 'd', 'g']),
  '4': new Set(['b', 'c', 'f', 'g']),
  '5': new Set(['a', 'c', 'd', 'f', 'g']),
  '6': new Set(['a', 'c', 'd', 'e', 'f', 'g']),
  '7': new Set(['a', 'b', 'c']),
  '8': new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
  '9': new Set(['a', 'b', 'c', 'd', 'f', 'g'])
};

const SevenSegmentDigit = ({digit}: {digit: string}) => {
  const activeSegments = segmentMap[digit] || new Set();

  const getSegmentOpacity = (segment: string) => (activeSegments.has(segment) ? 1 : 0.08);

  return (
    <div className={styles.digitContainer}>
      {/* Segment A - top */}
      <div
        className={`${styles.segment} ${styles.segmentHorizontal} ${styles.segmentA}`}
        style={{opacity: getSegmentOpacity('a')}}
      />
      {/* Segment B - top right */}
      <div
        className={`${styles.segment} ${styles.segmentVertical} ${styles.segmentB}`}
        style={{opacity: getSegmentOpacity('b')}}
      />
      {/* Segment C - bottom right */}
      <div
        className={`${styles.segment} ${styles.segmentVertical} ${styles.segmentC}`}
        style={{opacity: getSegmentOpacity('c')}}
      />
      {/* Segment D - bottom */}
      <div
        className={`${styles.segment} ${styles.segmentHorizontal} ${styles.segmentD}`}
        style={{opacity: getSegmentOpacity('d')}}
      />
      {/* Segment E - bottom left */}
      <div
        className={`${styles.segment} ${styles.segmentVertical} ${styles.segmentE}`}
        style={{opacity: getSegmentOpacity('e')}}
      />
      {/* Segment F - top left */}
      <div
        className={`${styles.segment} ${styles.segmentVertical} ${styles.segmentF}`}
        style={{opacity: getSegmentOpacity('f')}}
      />
      {/* Segment G - middle */}
      <div
        className={`${styles.segment} ${styles.segmentHorizontal} ${styles.segmentG}`}
        style={{opacity: getSegmentOpacity('g')}}
      />
    </div>
  );
};

const DigitalClock = ({hour, minute}: DigitalClockProps) => {
  const formatTwoDigits = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const formattedHour = formatTwoDigits(hour);
  const formattedMinute = formatTwoDigits(minute);

  return (
    <div className={styles.clockContainer}>
      <SevenSegmentDigit digit={formattedHour[0]} />
      <SevenSegmentDigit digit={formattedHour[1]} />
      <div className={styles.separator}>
        <div className={styles.separatorDot} />
        <div className={styles.separatorDot} />
      </div>
      <SevenSegmentDigit digit={formattedMinute[0]} />
      <SevenSegmentDigit digit={formattedMinute[1]} />
    </div>
  );
};

export default DigitalClock;
