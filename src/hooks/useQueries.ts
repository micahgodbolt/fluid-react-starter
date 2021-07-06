import { useSelector } from '../utils/useSelector';

export const useQueries = () => {
  return {
    useGetAllNodes: () => useSelector(
      (model, ev) => { return model.getAllNodes() },
      ['anyChanged'],
    )
  }
}