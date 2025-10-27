import React from 'react';

import {buttonVariants} from './Button.css';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  primary?: boolean;
  title?: string;
}

const Button = ({onClick, children, disabled, primary, title}: ButtonProps) => (
  <button
    className={primary ? buttonVariants.primary : buttonVariants.default}
    disabled={disabled}
    onClick={onClick}
    title={title || ''}
  >
    {children}
  </button>
);

export default Button;
