import { useEffect, useState } from "react";
import { getFluidContainer } from "./containerUtils";
import { FluidModel } from './model';

export const useModel = (id: string) => {
  const [model, setModel] = useState<FluidModel | undefined>();

  useEffect(() => {
    const loadModel = async () => {
      const [container, services] = await getFluidContainer(id);
      setModel(new FluidModel(container, services))
    }
    loadModel();
  }, [id]);

  return model;
}

 