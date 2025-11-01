import * as styles from './IconButton.css';

interface IconButtonProps {
  iconClass: string;
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton = ({iconClass, onClick, disabled}: IconButtonProps) => {
  return (
    <i
      className={`icon ${styles.icon} ${iconClass} ${disabled ? 'icon-disabled' : ''}`}
      onClick={onButtonClick}
      role="button"
      aria-disabled={disabled}
    />
  );

  function onButtonClick() {
    if (!disabled && onClick) {
      onClick();
    }
  }
};

export default IconButton;
