import React from 'react';
import styles from './input.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  isInputValid: boolean;
  onInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({
  id,
  type,
  label,
  placeholder,
  isInputValid,
  onInputValue,
}: IInputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`${styles.input}${!isInputValid ? ` ${styles.error}` : ''}`}
        id={id || ''}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={(evt) => onInputValue(evt.target.value)}
      />
    </div>
  );
};
