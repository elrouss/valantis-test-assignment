import { fetchData } from '@/helpers/fetchData';
import { IGoodsApiParamsExtended } from '@/types';

export const getFields = async (params?: IGoodsApiParamsExtended) => {
  try {
    const result = (await fetchData({
      action: 'get_fields',
      params,
    })) as Array<string | null>;

    return result;
  } catch (e) {
    throw e;
  }
};
