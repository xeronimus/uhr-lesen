import Button from './Button';
import * as styles from './ConfirmDialog.css';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({message, onConfirm, onCancel, confirmText = 'Ja', cancelText = 'Nein'}: ConfirmDialogProps) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm} primary>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
