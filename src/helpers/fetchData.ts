import axios, { AxiosResponse } from 'axios';
import md5 from 'md5';
import { getCurrentTimestamp } from './getCurrentTimestamp';
import { IGetIds, IGetItems, IGetFields, IFilter, IGoodsItem } from '@/types';

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
