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
    reducer: (state: any, action: any) => any;
    initialState: any;
    actions: any;
}

export function useGetStore<T>(getStuff: (model: FluidModel) => UseGetStoreProps) {
    const model = useModel();
    const { reducer, initialState } = getStuff(model)

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const callAnyDispatch = (ev: any) => {
            dispatch({ type: "singleChange", event: ev });
        };

        model.on("anyChanged", callAnyDispatch);
        return () => {
            model.off("anyChanged", callAnyDispatch);
        };
    })

    const store: { state: T } = { state }

    return store;
};


export const useGetDiceStore = () => useGetStore<{ [key: string]: ViewNode }>((model: FluidModel) => {
    return {
        initialState: model.getAllNodes(),
        reducer: (state: any, action: any) => {
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
        },
        actions: {
            editNode: (payload: any) => model.editNode(payload.id, payload.props),
            createNode: (payload: any) => model.createNode(payload.id, payload.props)
        }
    }
});



