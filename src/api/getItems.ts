import { fetchData } from '@/helpers/fetchData';
import { IGoodsItem } from '@/types';

export const getItems = async (ids: string[]) => {
  try {
    const result = (await fetchData({
      action: 'get_items',
      params: { ids },
    })) as IGoodsItem[];

    return result.filter(
      (item, i, arr) => arr.findIndex((item2) => item2.id === item.id) === i
    );
  } catch (e) {
    throw e;
  }
};
