import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { getIds } from './api/getIds';
import { getItems } from './api/getItems';
import commonJson from './assets/data/ru/common.json';
import goodsTableJson from './assets/data/ru/goods-table.json';
import { FormWithTable } from './components/blocks/form-with-table/form-with-table';
import { ErrorMessage } from './components/common/error-message/error-message';
import { Preloader } from './components/common/preloader/preloader';
import { IGoodsItem } from './types';
import { MAX_ITEMS } from './utils/variables';

export const App = () => {
  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IGoodsItem> | null>(null);
  const [filteredIds, setFilteredIds] = useState<string[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!isInitiallyLoading) setIsLoading(true);

      try {
        if (!filteredIds) {
          const ids = await getIds(
            isInitiallyLoading
              ? undefined
              : { offset: (currentPage - 1) * MAX_ITEMS, limit: MAX_ITEMS }
          );

          if (isInitiallyLoading) setTotalCount(ids.length);

          const items = await getItems(
            isInitiallyLoading ? ids.slice(0, MAX_ITEMS) : ids
          );

          setData(items);
        } else {
          if (!filteredIds?.length) {
            setErrorMessage(commonJson.errors.empty);
            return;
          }

          const counter = (currentPage - 1) * MAX_ITEMS;
          const items = await getItems(
            filteredIds.slice(counter, counter + MAX_ITEMS)
          );

          setData(items);
        }
      } catch (e) {
        switch ((e as AxiosError).response?.status) {
          case 401:
            setErrorMessage(commonJson.errors.authorization);
            break;
          default:
            setErrorMessage(commonJson.errors.internal);
        }
      } finally {
        if (!isInitiallyLoading) setIsLoading(false);
        setIsInitiallyLoading(false);
      }
    };

    fetchData();
  }, [currentPage, filteredIds]);

  return (
    <>
      {!isInitiallyLoading && !errorMessage && data?.length && (
        <FormWithTable
          form={goodsTableJson.form}
          table={{
            head: goodsTableJson.head,
            body: data,
            currentPage,
            totalCount,
            setCurrentPage,
            setTotalCount,
            setFilteredIds,
          }}
          filters={goodsTableJson.filters}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsInitiallyLoading={setIsInitiallyLoading}
        />
      )}
      {!isInitiallyLoading &&
        errorMessage &&
        errorMessage !== commonJson.errors.empty && (
          <ErrorMessage text={errorMessage} />
        )}
      {isInitiallyLoading && <Preloader />}
    </>
  );
};
