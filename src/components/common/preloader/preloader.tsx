import styles from './preloader.module.scss';

interface IPreloaderProps {
  extraClass?: string;
}

export const Preloader = ({ extraClass }: IPreloaderProps) => {
  return <div className={`${styles.preloader} ${extraClass}`} />;
};
