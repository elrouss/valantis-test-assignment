import styles from './pagination-btn.module.scss';
import { IBtn } from '@/types';

export const PaginationBtn = ({
  extraClass,
  type = 'button',
  text,
  disabled = false,
  ariaLabel,
  onClick,
}: IBtn) => {
  return (
    <button
      className={`${styles.btn}${extraClass ? ` ${extraClass}` : ''}`}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
