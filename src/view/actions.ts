import { FluidModel } from "../model";
import { Node } from '../model/types';
type ActionType<T> = (model: FluidModel, payload: T) => void;


const editNode: ActionType<{ id: string, props: Partial<Node> }> = (model, payload ) => {
  model.editNode(payload.id, payload.props);
}

const createNode: ActionType<{ id: string, props: Node }> = (model, payload) => {
  model.createNode(payload.id, payload.props);
}

export const reducers = {
  editNode,
  createNode
}

