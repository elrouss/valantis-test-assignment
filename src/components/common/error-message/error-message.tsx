import styles from './error-message.module.scss';

interface IErrorMessageProps {
  text: string;
}

export const ErrorMessage = ({ text }: IErrorMessageProps) => {
  return <p className={styles.error}>{text}</p>;
};
