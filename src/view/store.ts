import { FluidModel } from '../model';
import { Node } from '../model/types';
import { useGetStore } from '../utils/hooks';

const getDiceArray = (state: any) =>
  Object.keys(state).map((key: string) => ({ key, value: state[key].value }));

const getLoadState = (model: FluidModel) => model.getAllNodes();

export const useGetDiceStore = () => useGetStore<Record<string, Node>>({

  // Establish initial state on load
  initialState: (model) => getLoadState(model),

  // Specify stateful queries to use in the view
  queries: {
    getAllDice: (state) => getDiceArray(state),
    getByValue: (state, value: number) => getDiceArray(state).filter((i) => i.value === value),
  },

  // Specify actions, their payloads, and how they will interact with the model
  actions: {
    editDice: (
      model,
      payload: { id: string, props: { value: number } }
    ) => model.editNode(payload.id, payload.props),
    createDice: (
      model,
      payload: { id: string, props: { value: number } }
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
