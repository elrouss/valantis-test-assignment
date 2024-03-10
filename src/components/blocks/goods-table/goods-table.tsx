import React from 'react';
import styles from './goods-table.module.scss';
import commonJson from '../../../assets/data/ru/common.json';
import { Preloader } from '@/components/common/preloader/preloader';
import { Pagination } from '@/components/ui/pagination/pagination';
import { IGoodsTable } from '@/types';

interface IGoodsTableProps extends IGoodsTable {
  extraClass?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

export const GoodsTable = ({
  extraClass,
  caption,
  head,
  body,
  currentPage,
  pageSize,
  totalCount,
  setCurrentPage,
  isLoading,
}: IGoodsTableProps) => {
  return (
    <div className={`${styles.wrapper}${extraClass ? ` ${extraClass}` : ''}`}>
      <div className={styles.tableWrapper}>
        <Preloader
          extraClass={`${styles.preloader}${isLoading ? ` ${styles.preloaderVisible}` : ''}`}
        />
        <table className={styles.table}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead className={styles.thead}>
            <tr>
              {head.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`${styles.tbody}${isLoading ? ` ${styles.loading}` : ''}`}
          >
            {body?.length ? (
              body.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product || '-'}</td>
                  <td>{item.brand || '-'}</td>
                  <td>{`${item.price?.toLocaleString()} \u20BD` || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>{commonJson.errors.empty}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        extraClass="mg-m"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        isLoading={isLoading}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
