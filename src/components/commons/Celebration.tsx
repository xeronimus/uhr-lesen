import * as styles from './Celebration.css';

interface CelebrationProps {
  text?: string;
  stickier?: boolean;
}

const Celebration = ({text, stickier}: CelebrationProps) => {
  return (
    <div className={styles.celebrationContainer}>
      {Array.from({length: styles.particleCount}).map((_, i) => (
        <div key={i} className={`${styles.particle} ${styles.particleStyles[`particle${i}`]}`} />
      ))}

      {text && <div className={stickier ? styles.celebrationTextLong : styles.celebrationText}>{text}</div>}
    </div>
  );
};

export default Celebration;
