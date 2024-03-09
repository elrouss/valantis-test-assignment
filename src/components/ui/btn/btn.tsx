import styles from './btn.module.scss';
import { IBtn } from '@/types';

export const Btn = ({ type, text, onClick }: IBtn) => {
  return (
    <button className={styles.btn} type={type || 'button'} onClick={onClick}>
      {text}
    </button>
  );
};
