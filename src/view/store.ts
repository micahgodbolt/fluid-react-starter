import { FluidModel } from '../model';
import { Node } from '../model/types';
import { useGetStore } from '../utils/hooks';

const getDiceArray = (state: any) =>
  Object.keys(state).map((key: string) => ({ key, value: state[key].value }));

const getLoadState = (model: FluidModel) => model.getAllNodes();

export const useGetDiceStore = () =>
  useGetStore<Record<string, Node>, any>({
    initialState: (model) => getLoadState(model),
    queries: {
      getAllDice: (state) => getDiceArray(state),
      getByValue: (state, value: number) =>
        getDiceArray(state).filter((item) => item.value === value),
    },
    actions: {
        editDice: (model, payload: { id: string, props: { value: number } }) => model.editNode(payload.id, payload.props),
        createDice: (model, payload: { id: string, props: { value: number } }) => model.createNode(payload.id, payload.props),
        deleteDice: (model, payload: { id: string }) => model.deleteNode(payload.id)
    },
    reducer: (model, state, payload) => {
        let newState;
        switch (payload.type) {
            case "singleChange":
                const modifiedKey = payload.changed.key;
                const changedItem = { [modifiedKey]: model.getNode(modifiedKey) }
                newState = { ...state, ...changedItem };
                break;
            case "singleDelete":
                const {[payload.changed.key]: removedItem, ...rest} = state;
                newState = rest;
                break;
            default: {
                newState = getLoadState(model);
            }
      }
      return newState;
    },
  });
