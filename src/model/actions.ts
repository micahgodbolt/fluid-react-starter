import { FluidModel } from "../model";
import { Node } from '../model/types';

type ActionType = (model: FluidModel, payload: any) => void;

export const actions: Record<string, ActionType> = {
  editNode: (model, payload: { id: string, props: Node }) => {
    model.editNode(payload.id, payload.props);
  },
  createNode: (model, payload: { id: string, props: Node }) => {
    model.createNode(payload.id, payload.props);
  },
}

