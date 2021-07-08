import { FluidModel } from ".";
import { Node } from "./types"

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

const useGetNode: QueryType<{id: string}, Node> = ((params) => ({
    query: (model: FluidModel, ev: any) => { 
        return model.getNode(params.id);
    },
    events: [`${params.id}Changed`],
}));

export const selectors = {
    useGetAllNodeIds,
    useGetNode,
};

