import styles from './pagination.module.scss';
import { PaginationBtn } from '../pagination-btn/pagination-btn';
import { usePagination, DOTS } from '@/hooks/usePagination';
import { IPaginationData } from '@/types';

interface IPaginationProps extends IPaginationData {
  extraClass?: string;
  isLoading: boolean;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  extraClass,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 50,
  isLoading,
}: IPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })!;

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <ul className={`${styles.pagination}${extraClass ? ` ${extraClass}` : ''}`}>
      <li className={styles.paginationItem}>
        <PaginationBtn
          text="&larr;"
          disabled={currentPage === 1 || isLoading}
          onClick={onPrevious}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li className={`${styles.paginationItem} ${styles.dots}`}>
              <PaginationBtn disabled text="&#8230;" />
            </li>
          );
        }

        return (
          <li
            className={`${styles.paginationItem}${currentPage === pageNumber ? ` ${styles.activeBtn}` : ''}`}
          >
            <PaginationBtn
              text={String(pageNumber)}
              disabled={isLoading}
              onClick={() => onPageChange(+pageNumber)}
            />
          </li>
        );
      })}
      <li className={styles.paginationItem}>
        <PaginationBtn
          text="&rarr;"
          disabled={currentPage === lastPage || isLoading}
          onClick={onNext}
        />
      </li>
    </ul>
  );
};
