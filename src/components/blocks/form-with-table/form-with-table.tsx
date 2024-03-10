import { AxiosError } from 'axios';
import React, { useState } from 'react';
import styles from './form-with-table.module.scss';
import { GoodsTable } from '../goods-table/goods-table';
import { Radios } from '../radios/radios';
import { filter } from '@/api/filter';
import { Btn } from '@/components/ui/btn/btn';
import { Input } from '@/components/ui/input/input';
import { handleErrors } from '@/helpers/handleErrors';
import { IGoodsTable, IFormWithTable, TFiltersValues } from '@/types';
import { MAX_ITEMS } from '@/utils/variables';

interface IGoodsTableExtended extends IGoodsTable {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setFilteredIds: React.Dispatch<React.SetStateAction<string[] | null>>;
}

interface IFormWithTableProps extends IFormWithTable {
  table: IGoodsTableExtended;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInitiallyLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const FormWithTable = ({
  form,
  filters,
  table,
  isLoading,
  setIsLoading,
  setIsInitiallyLoading,
  setErrorMessage,
}: IFormWithTableProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [radioValue, setRadioValue] = useState<TFiltersValues | ''>('');

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (radioValue === 'reset') {
      setIsInitiallyLoading(true);
      table.setFilteredIds(null);
      table.setCurrentPage(1);

      return;
    }

    if (!inputValue || !radioValue) {
      setIsInputValid(false);

      return;
    }

    setIsInputValid(true);
    setIsLoading(true);

    try {
      const ids = await filter({
        [radioValue]:
          radioValue === 'price'
            ? +inputValue.replace(/[^\d]/g, '')
            : inputValue,
      } as Record<TFiltersValues, string | number>);

      table.setTotalCount(ids.length);
      table.setFilteredIds(ids);
      table.setCurrentPage(1);
    } catch (e) {
      setErrorMessage(handleErrors(e as AxiosError));
    }
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <div className={styles.filters}>
        <div className={styles.input}>
          <Input
            placeholder={form.input.placeholder}
            isInputValid={isInputValid}
            onInputValue={setInputValue}
          />
          <Btn type="submit" text={form.btn} />
        </div>
        <Radios
          name={filters.name}
          fields={filters.fields}
          setRadioValue={setRadioValue}
        />
      </div>
      <GoodsTable
        extraClass="mg-m"
        head={table.head}
        body={table.body}
        caption={table.caption}
        totalCount={table.totalCount}
        currentPage={table.currentPage}
        pageSize={MAX_ITEMS}
        isLoading={isLoading}
        setCurrentPage={table.setCurrentPage}
      />
    </form>
  );
};
