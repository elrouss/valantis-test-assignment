import React from 'react';
import { v4 } from 'uuid';
import styles from './radios.module.scss';
import { Radio } from '@/components/ui/radio/radio';
import { IFilters, TFiltersValues } from '@/types';

interface IRadiosProps extends IFilters {
  setRadioValue: React.Dispatch<React.SetStateAction<TFiltersValues | ''>>;
}

export const Radios = ({ name, fields, setRadioValue }: IRadiosProps) => {
  return (
    <div className={styles.wrapper}>
      {fields.map((field, i) => (
        <Radio
          key={i}
          id={v4()}
          name={name}
          label={field.label}
          value={field.value}
          setRadioValue={setRadioValue}
        />
      ))}
    </div>
  );
};
