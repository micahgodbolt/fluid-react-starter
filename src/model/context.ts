import { createContext } from "react";
import { FluidModel } from "./model";

export const AppContext = createContext<FluidModel>({} as FluidModel);