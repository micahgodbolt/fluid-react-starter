import { useModel } from "../utils";
import { Node } from '../model/types';
// TODO: Move actual actions to model and use hook to wrap them up with context

const actions = {
  editNode: (id: string, props: Partial<Node>) => {
    return {
      type: "editNode",
      id,
      props,
    };
  },
  createNode: (id: string, props: Node) => {
    return {
      type: "createNode",
      id,
      props,
    }
  },
  getAllNodes: () => {
    return {
      type: "getAllNodess",
    }
  }
}


export const useDispatch = () => {
  const model = useModel();
  const dispatch = (action: any) => {
    if (!model) return;
    switch (action.type) {
      case "editNode":
        model.editNode(action.id, action.props);
        break;
      case "createNode":
        model.createNode(action.id, action.props);
        break;
      case "getAllNodes":
        model.getAllNodes();
        break;
      default:
        break;
    }
  };
  return { dispatch, actions };
}