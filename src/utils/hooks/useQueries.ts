import { useSelector } from "./useSelector";
import { selectors } from "../../view/queries";

type SelectorKeys = keyof typeof selectors;
type Selectors = typeof selectors;

export const useQueries = () => {
  type Queries = {
    [Property in SelectorKeys]: (
      params: Parameters<Selectors[Property]>[0]
    ) => ReturnType<ReturnType<Selectors[Property]>["query"]>;
  };

  const queries = {} as Queries;

  for (const i in selectors) {
    const key = i as SelectorKeys;
    const selector = selectors[key];
    const useHook = (...params: any): any => {
      const value = (selector as any)(...params);
      return useSelector(value.query, value.events);
    };
    queries[key] = useHook;
  }

  return queries;
};
