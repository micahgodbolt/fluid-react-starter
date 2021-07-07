import { useSelector } from '../utils/useSelector';
import { Node } from "../model";

export const useQueries = () => {
  return {
    useGetAllNodeIds: () => useSelector<string[]>(
      (model, ev) => { 
        return model.getAllNodeIds();
      },
      ['anyChanged'],
    ),
    useGetNode: (id: string) => useSelector<Node>(
      (model, ev) => { 
        return model.getNode(id);
      },
      [`${id}Changed`],
    )
  }
}