import React from 'react';
import { FluidModel, EventPayload } from '../../model';
import { useModel } from './';

interface UseGetStoreProps<TState = any> {
  initialState: (model: FluidModel) => TState;
  actions: Record<string, (model: FluidModel, payload: any) => void>;
  queries: Record<string, (state: TState, props: any) => void>;
  reducer: (model: FluidModel, state: TState, payload: EventPayload) => void;
}

interface UseGetStoreReturn {
  dispatch: (payload: any) => void;
  actions: Record<string, (payload: any) => void>;
  queries: Record<string, (props?: any) => any>;
}

export function useGetStore<S>(props: UseGetStoreProps<S>): UseGetStoreReturn {
  const model = useModel();

  const reducer = (state: any, op: any) => props.reducer(model, state, op);

  const [state, dispatchState] = React.useReducer<React.Reducer<any, any>>(
    reducer,
    props.initialState(model)
  );

  React.useEffect(() => {
    const callItemDispatch = (payload: any) => {
      dispatchState(payload);
    };

    model.on('modelChanged', callItemDispatch);
    return () => {
      model.off('modelChanged', callItemDispatch);
    };
  });

  const dispatch = (payload: any) => {
    const userAction = props.actions[payload.type];

    if (userAction !== undefined) {
      userAction(model, payload);
    }
  };

  const actions = {} as any;

  for (const i in props.actions) {
    actions[i] = (payload: any) => ({
      type: i,
      ...payload,
    });
  }

  const queries = {} as any;

  for (const j in props.queries) {
    queries[j] = (payload: any) => props.queries[j](state, payload);
  }

  return { dispatch, actions, queries };
}
