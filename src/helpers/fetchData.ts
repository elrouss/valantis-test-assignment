import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import md5 from 'md5';
import { getCurrentTimestamp } from './getCurrentTimestamp';
import { IGetIds, IGetItems, IGetFields, IFilter, IGoodsItem } from '@/types';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (...args) => axiosRetry.exponentialDelay(...args, 1000),
  retryCondition(error) {
    switch (error.response?.status) {
      case 500:
      case 501:
        return true;
      default:
        return false;
    }
  },
  onRetry: (retryCount, _, requestConfig) => {
    if (retryCount === 3) {
      // eslint-disable-next-line no-param-reassign
      requestConfig.url = import.meta.env.VITE_API_URL_OPENAPI_2 as string;
    }
  },
});

export const fetchData = async ({
  action,
  params,
}: IGetIds | IGetItems | IGetFields | IFilter) => {
  try {
    const response: AxiosResponse<
      Record<'result', string[] | IGoodsItem[] | (string | null)[]>,
      unknown
    > = await axios.post(
      import.meta.env.VITE_API_URL_OPENAPI_1 as string,
      {
        action,
        params,
      },
      {
        headers: {
          'X-Auth': `${md5(`${import.meta.env.VITE_API_URL_OPENAPI_PASSWORD as string}_${getCurrentTimestamp()}`)}`,
        },
      }
    );

    if (response.status !== 200 || !response.data.result) {
      throw new Error();
    }

    return response.data.result;
  } catch (e) {
    throw e;
  }
};
