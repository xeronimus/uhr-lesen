import * as styles from './ProgressBar.css';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = ({percentage, showLabel = false, label}: ProgressBarProps) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const displayLabel = label || `${Math.round(clampedPercentage)}%`;

  return (
    <div className={styles.container}>
      <div className={styles.fill} style={{width: `${clampedPercentage}%`}} />
      {showLabel && <div className={styles.label}>{displayLabel}</div>}
    </div>
  );
};

export default ProgressBar;
