import { FrsMember } from '@fluid-experimental/frs-client';
import { FluidModel } from '../model';
import { Node, Status } from '../model/types';
import { useGetStore } from '../utils/hooks';

const getDiceArray = (nodes: Record<string, Node>): Node[] =>{
  return Object.keys(nodes).map((key: string) => nodes[key]);
}
  

const getLoadState = (model: FluidModel) => { 
  return {
    nodes: model.getAllNodes(),
    repos: model.getRepos(),
  }
}

interface IStoreState {
  nodes: Record<string, Node>,
  repos: string[],
}

type IDiceQueries = {
  getAllDice: () => Node[],
  getByStatus: (status: Status) => Node[],
  getRepos: () => string[],
}

type IDiceActions = {
  editDice: (payload: { id: string, props: Partial<Node> }) => void;
  createDice: (payload: { id: string, props: Node }) => void;
  deleteDice: (payload: { id: string }) => void;
  setRepos: (payload: { repos: string[] }) => void
}

export const useGetDiceStore = () => useGetStore<IStoreState, IDiceActions, IDiceQueries>({

  // Establish initial state on load
  initialState: (model) => getLoadState(model),

  // Specify stateful queries to use in the view
  queries: {
    getAllDice: (state) => getDiceArray(state.nodes),
    getByStatus: (state, status: Status) => getDiceArray(state.nodes).filter((i) => i.status === status),
    getRepos: (state) => state.repos,
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
    ) => model.deleteNode(payload.id),
    setRepos: (
      model,
      payload: { repos: string[] }
    ) => model.setRepos(payload.repos)
  },

  // Sync view state with Fluid state by loading default state or patching the key that changed
  reducer: (model, state, { type, changed }) => {
    let newState: IStoreState;
    switch (type) {
      case "singleChange":
        if (changed.key === "repos") {
          newState = { ...state, ...{ repos: model.getRepos()} };
        } else {
          const changedItem = { [changed.key]: model.getNode(changed.key) }
          newState = { ...state, nodes: { ...state.nodes, ...changedItem }};
        }
        break;
      case "singleDelete":
        const { [changed.key]: removedItem, ...rest } = state.nodes;
        newState = {...state, nodes: rest };
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