import * as React from "react";
import { useModel } from "./context/useModel";
import { FluidModel } from '../model/model'


export const useSelector = <T,>(
  selector: (model: FluidModel, ev?: any) => any,
  listener: string[],
) => {
  const model = useModel();
  const [selectorState, setSelectorState] = React.useState(selector(model));

  React.useEffect(() => {
    const updateSelectorState = (ev: any) => {
      setSelectorState(selector(model, ev));
    };
    listener.forEach((eventName) => {
      model.on(eventName, updateSelectorState);
    });

    return () => {
      listener.forEach((eventName) => {
        model.off(eventName, updateSelectorState);
      });
    };
  }, [selector, listener, model]);

  return selectorState as T;
};