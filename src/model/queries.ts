import { FluidModel } from ".";

export type QueryType = (params: any) => {
    query: (model: FluidModel, payload: any) => void;
    events: string[]
};

const useGetAllNodeIds = () => ({
    query: (model: FluidModel, ev: any) => { 
        return model.getAllNodeIds();
    },
    events: ["anyChanged"]
});

const useGetNode = (id: string) => ({
    query: (model: FluidModel, ev: any) => { 
        return model.getNode(id);
    },
    events: [`${id}Changed`],
});

export const queries = {
    useGetAllNodeIds,
    useGetNode,
};

