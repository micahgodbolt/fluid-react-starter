import { ISharedMap } from "@fluid-experimental/fluid-framework";
import { FrsClient } from "@fluid-experimental/frs-client";
import { v4 as uuid } from "uuid";
import {
  containerConfig,
  defaultData,
  serviceConfig,
  FILEPATH,
  connectionConfig,
} from "../config";

const client = new FrsClient(connectionConfig);

export const createFilePath = (id: string) => {
  return `/${FILEPATH}/${id}`;
}

export const createFluidFile = async () => {
  const id = uuid();
  const { fluidContainer } = await client.createContainer(
    { ...serviceConfig, id },
    containerConfig
  );
  const map = fluidContainer.initialObjects.myMap as ISharedMap;
  for (const data of defaultData) {
    map.set(data.id, { value: data.value });
  }
  return createFilePath(id);
}

export const getFluidContainer = async (id: string) => {
  return await client.getContainer({ ...serviceConfig, id }, containerConfig);
}
