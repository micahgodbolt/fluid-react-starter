import { useSelector } from './useSelector';
import { queries } from "../../model";

export const useQueries = () => {
  type QueryKeys = keyof typeof queries;
  const selectorQueries: Record<string, any> = {};

  for (const key in queries) {
    const getQuery = queries[key as QueryKeys];
    const useHook = (...params: any): void => {
      const value = (getQuery as any)(...params);
      return useSelector(value.query, value.events);
    };
    selectorQueries[key] = useHook as (params: Parameters<typeof getQuery>) => void;
  }
  
  return selectorQueries as Record<QueryKeys, any>;
}