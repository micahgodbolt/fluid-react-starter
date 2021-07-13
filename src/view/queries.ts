import React from "react";
import { FluidModel } from "../model";
import { Node } from "../model/types"
import { useModel } from '../utils';


type StoreReturnProps = {
    reducer: (state: any, action: any) => any;
    initialState: any;
    actions: Record<string, (payload: any) => void>;
}

export const useDispatch = (userActions: StoreReturnProps['actions']) => {
  
    const dispatch = (payload: { type: string } ) => {
      const userAction = userActions[payload.type];

      if (userAction !== undefined) {
        userAction(payload)
      }
    };
  
    type Actions = {
      [Property in keyof typeof userActions]: (p: Parameters<typeof userActions[Property]>[0]) => any
    }
  
    const actions = {} as Actions;
  
    for (const i in userActions) {
      actions[i] = (payload: any) => ({
        type: i,
        ...payload
      })
    }
  
    return { dispatch, actions };
  }

export function useGetStore<T>(getStore: (model: FluidModel) => StoreReturnProps) {
    const model = useModel();
    const store = getStore(model)

    const [state, dispatchState] = React.useReducer<React.Reducer<T, any>>(store.reducer, store.initialState);

    React.useEffect(() => {
        const callAnyDispatch = (ev: any) => {
            dispatchState({ type: "anyChanged", event: ev });
        };

        model.on("anyChanged", callAnyDispatch);
        return () => {
            model.off("anyChanged", callAnyDispatch);
        };
    })

    const { dispatch, actions } = useDispatch(store.actions);

    return { state, dispatch, actions };
};

export const useGetDiceStore = () => useGetStore<{ [key: string]: Node }>((model) => {
    return {
        initialState: model.getAllNodes(),
        reducer: (state: any, action: any) => {
            let newState;
            switch (action.type) {
                case "anyChanged":
                    const modifiedKey = action.event.key;
                    newState = { ...state, [modifiedKey]: model.getNode(modifiedKey) };
                    break;
                default: {
                    newState = model.getAllNodes();
                }   
            }
            return newState;
        },
        actions: {
            editNode: (payload: {id: string, props: {value: number}}) => model.editNode(payload.id, payload.props),
            createNode: (payload: any) => model.createNode(payload.id, payload.props)
        }
    }
});





