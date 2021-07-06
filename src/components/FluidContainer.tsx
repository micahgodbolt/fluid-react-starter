import React from "react";
import { AppContext, useModel } from "../model";

export const FluidContainer: React.FC<{ id: string }> = (props) => {
  const model = useModel(props.id);

  if (!model) return <div />;

  // Force typing on data because we know the shape
  return (
    <AppContext.Provider value={model}>
      {props.children}
    </AppContext.Provider>
  )
}
