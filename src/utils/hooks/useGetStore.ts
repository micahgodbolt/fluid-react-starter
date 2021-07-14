import React from "react";
import { FluidModel } from "../../model";
import { useModel } from './';

interface UseGetStoreProps< TState = any, TPayload = any> {
  initialState: (model: any) => TState;
  actions: Record<string, (model: FluidModel, payload: TPayload) => void>;
  queries: Record<string, (model: FluidModel, props: any) => void>;
  reducer: (model: FluidModel, state: TState, op: any) => void
}

interface UseGetStoreReturn<TPayload = any> {
  dispatch: (payload: TPayload) => void;
  actions: Record<string, (payload: TPayload) => void>;
  queries: Record<string, (props?: any ) => any>;
}

export function useGetStore<S, P extends UseGetStoreProps>(props: UseGetStoreProps<S, P>): UseGetStoreReturn<P> {
  const model = useModel();

  const reducer = (state: any, op: any) => props.reducer(model, state, op);

  const [state, dispatchState] = React.useReducer<React.Reducer<any, any>>(reducer, props.initialState(model));

  React.useEffect(() => {
      const callItemDispatch = (ev: any) => {
          dispatchState({ type: "itemChanged", event: ev });
      };

      model.on("itemChanged", callItemDispatch);
      return () => {
          model.off("itemChanged", callItemDispatch);
      };
  })

  const dispatch = (payload: any) => {
      const userAction = props.actions[payload.type];

      if (userAction !== undefined) {
          userAction(model, payload)
      }
  };

  const actions = {} as any;

  for (const i in props.actions) {
      actions[i] = (payload: any) => ({
          type: i,
          ...payload
      })
  }

  const queries = {} as any;

  for (const j in props.queries) {
      queries[j] = (payload: any) => props.queries[j](state, payload) ;
  }

  return { dispatch, actions, queries };
};