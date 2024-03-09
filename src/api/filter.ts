import { fetchData } from '@/helpers/fetchData';
import { TFiltersValues } from '@/types';

export const filter = async (
  params: Record<TFiltersValues, string | number>
) => {
  try {
    const result = (await fetchData({
      action: 'filter',
      params,
    })) as string[];

    return result;
  } catch (e) {
    throw e;
  }
};
