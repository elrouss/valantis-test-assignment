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
      {/* Крайняя левая кнопка со стрелкой "Назад" */}
      <li className={styles.paginationItem}>
        <PaginationBtn
          text="&larr;"
          disabled={currentPage === 1 || isLoading}
          onClick={onPrevious}
        />
      </li>
      {paginationRange.map((pageNumber, i) => {
        // Кнопки в виде многоточия
        if (pageNumber === DOTS) {
          return (
            <li key={i} className={`${styles.paginationItem} ${styles.dots}`}>
              <PaginationBtn disabled text="&#8230;" />
            </li>
          );
        }

        // Кнопки с пагинацией
        return (
          <li
            key={i}
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

      {/* Крайняя правая кнопка со стрелкой "Вперед" */}
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
