import {checkboxMarkerVariants, checkboxWrapper} from './Checkbox.css';

interface CheckboxProps {
  value: boolean;
  label: string;
  title?: string;
  labelLeft?: boolean;
  onChange: (v: boolean) => void;
}

export const Checkbox = ({value, label, labelLeft, title, onChange}: CheckboxProps) => (
  <div className={checkboxWrapper} onClick={() => onChange(!value)} title={title || ''}>
    {!!labelLeft && label}

    <span className={value ? checkboxMarkerVariants.checked : checkboxMarkerVariants.default} />

    {!labelLeft && label}
  </div>
);
