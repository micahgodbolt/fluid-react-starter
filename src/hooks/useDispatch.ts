import { useContext } from "react";
import { AppContext } from "../model/context";
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
  createNode: (props: Node) => {
    return {
      type: "createNode",
      props,
    }
  }
}


export const useDispatch = () => {
  const model = useContext(AppContext);
  const dispatch = (action: any) => {
    if (!model) return;
    switch (action.type) {
      case "editNode":
        model.editNode(action.id, action.props)
        break;
      case "createNode":
        model.createNode(action.props)
        break;
      default:
        break;
    }
  };
  return { dispatch, actions };
}