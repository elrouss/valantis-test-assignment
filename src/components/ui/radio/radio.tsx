import React from 'react';
import styles from './radio.module.scss';
import { TFiltersValues } from '@/types';

interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  setRadioValue: React.Dispatch<React.SetStateAction<TFiltersValues | ''>>;
}

export const Radio = ({
  id,
  name,
  label,
  value,
  setRadioValue,
}: IRadioProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        onChange={(evt) => setRadioValue(evt.target.value as TFiltersValues)}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
