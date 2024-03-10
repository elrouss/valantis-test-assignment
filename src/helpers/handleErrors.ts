import { AxiosError } from 'axios';
import commonJson from '../assets/data/ru/common.json';

export const handleErrors = (e: AxiosError) => {
  switch (e.response?.status) {
    case 401:
      return commonJson.errors.authorization;
    default:
      return commonJson.errors.internal;
  }
};
