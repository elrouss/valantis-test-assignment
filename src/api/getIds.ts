import { fetchData } from '@/helpers/fetchData';
import { IGoodsApiParams } from '@/types';

export const getIds = async (params?: IGoodsApiParams) => {
  try {
    const result = (await fetchData({ action: 'get_ids', params })) as string[];
    return result;
  } catch (e) {
    throw e;
  }
};
