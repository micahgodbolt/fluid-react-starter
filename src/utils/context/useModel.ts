import { useContext } from "react";
import { ModelContext } from "./context";

export const useModel = () => useContext(ModelContext);