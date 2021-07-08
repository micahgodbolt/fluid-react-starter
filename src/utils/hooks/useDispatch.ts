import { useModel } from "../../utils";
import { actions as appActions } from '../../model';
// TODO: Move actual actions to model and use hook to wrap them up with context


type AppActions = typeof appActions;

export const useDispatch = () => {
  const model = useModel();

  const dispatch = (payload: { type: keyof AppActions; [key:string]: any}) => {
    if (!model) return;

    const { type, ...rest } = payload;
    const action = appActions[type];

    if (action !== undefined) {
      action(model, rest as any )
    }
  };

  const actions = {} as Record<keyof AppActions, (p: any) => any>;

  for (const key in appActions) {
    actions[key] = (payload: any) => ({
      type: key,
      ...payload
    })
  }
  return { dispatch, actions };
}
