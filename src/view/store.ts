import { FrsMember } from '@fluid-experimental/frs-client';
import { FluidModel } from '../model';
import { Node, Status } from '../model/types';
import { useGetStore } from '../utils/hooks';

const getDiceArray = (state: Record<string, Node>): Node[] =>
  Object.keys(state).map((key: string) => state[key]);

const getLoadState = (model: FluidModel) => model.getAllNodes();

type IDiceQueries = {
  getAllDice: () => Node[],
  getByStatus: (status: Status) => Node[],
}

type IDiceActions = {
  editDice: (payload: { id: string, props: Partial<Node> }) => void;
  createDice: (payload: { id: string, props: Node }) => void;
  deleteDice: (payload: { id: string }) => void;
}

export const useGetDiceStore = () => useGetStore<Record<string, Node>, IDiceActions, IDiceQueries>({

  // Establish initial state on load
  initialState: (model) => getLoadState(model),

  // Specify stateful queries to use in the view
  queries: {
    getAllDice: (state) => getDiceArray(state),
    getByStatus: (state, status: Status) => getDiceArray(state).filter((i) => i.status === status),
  },

  // Specify actions, their payloads, and how they will interact with the model
  actions: {
    editDice: (
      model,
      payload: { id: string, props: Partial<Node> }
    ) => model.editNode(payload.id, payload.props),
    createDice: (
      model,
      payload: { id: string, props: Node }
    ) => model.createNode(payload.id, payload.props),
    deleteDice: (
      model,
      payload: { id: string }
    ) => model.deleteNode(payload.id)
  },

  // Sync view state with Fluid state by loading default state or patching the key that changed
  reducer: (model, state, { type, changed }) => {
    let newState;
    switch (type) {
      case "singleChange":
        const changedItem = { [changed.key]: model.getNode(changed.key) }
        newState = { ...state, ...changedItem };
        break;
      case "singleDelete":
        const { [changed.key]: removedItem, ...rest } = state;
        newState = rest;
        break;
      default: {
        newState = getLoadState(model);
      }
    }
    return newState;
  },
});

type IAudienceQueries = {
  getAudienceSize: () => number;
  getAudienceNames: () => string[];
}

export const useGetAudienceStore = () => useGetStore<FrsMember[], {}, IAudienceQueries>({
  initialState: (model) => model.getAudience(),
  queries: {
    getAudienceNames: (state) => state.map((member) => member.userName),
    getAudienceSize: (state) => state.length
  },
  actions: {},
  reducer: (model, state, {type}) => {
    return model.getAudience();
  }
})