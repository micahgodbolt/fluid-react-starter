import { useModel } from "../utils";
import { reducers } from '../actions/actions';
// TODO: Move actual actions to model and use hook to wrap them up with context


type ReducerKeys = keyof typeof reducers;
type Reducers = typeof reducers;

export const useDispatch = () => {
  const model = useModel();

  const dispatch = (payload: { type: ReducerKeys; [key:string]: any}) => {
    if (!model) return;

    const { type, ...rest } = payload;
    const reducer = reducers[type];

    if (reducer !== undefined) {
      reducer(model, rest as any )
    }
  };

  type Actions = {
    [Property in keyof Reducers]: (p: Parameters<Reducers[Property]>[1]) => any
  }

  const actions = {} as Actions;

  for (const i in reducers) {
    const key = i as ReducerKeys;
    actions[key] = (payload) => ({
      type: key,
      ...payload
    })
  }

  return { dispatch, actions };
}
