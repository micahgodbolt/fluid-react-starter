import React from "react";
import { FluidModel } from "../model";
import { Node } from "../model/types"
import { useModel } from '../utils';

export type QueryType<T, S> = (params: T) => {
    query: (model: FluidModel, ev: any) => S;
    events: string[]
};

const useGetAllNodeIds: QueryType<{}, string[]> = () => ({
    query: (model: FluidModel, ev: any) => {
        return model.getAllNodeIds();
    },
    events: ["anyChanged"]
});


export const selectors = {
    useGetAllNodeIds,
};

export interface ViewNode extends Node {
    key: string;
}

type UseGetStoreProps = {
    reducer: any;
    initialState: any;
}

export function useGetStore<T>({reducer, initialState}: UseGetStoreProps) {
    const model = useModel();
    const initState = initialState(model) as T;
    const r = reducer(model) as (state: any, action: any) => any ; 

    const [state, dispatch] = React.useReducer(r, initState);

    React.useEffect(() => {
        const callAnyDispatch = (ev: any) => {
            dispatch({ type: "singleChange", event: ev });
        };

        model.on("anyChanged", callAnyDispatch);
        return () => {
            model.off("anyChanged", callAnyDispatch);
        };
    })

    return state as T;
};


export const useGetAllDice = () => useGetStore<{[key: string]: ViewNode}>({
    reducer: (model: FluidModel) => {
        return (state: any, action: any) => {
            let newState;
            switch (action.type) {
                case "singleChange":
                    const modifiedKey = action.event.key;
                    newState = { ...state, [modifiedKey]: model.getNode(modifiedKey) };
                    break;
    
                default:
                    break;
            }
            return newState;
        }
    },
    initialState: (model: FluidModel) => {
        return model.getAllNodes();
    }
})








