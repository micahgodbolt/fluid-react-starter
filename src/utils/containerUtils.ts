import { ISharedMap } from "@fluid-experimental/fluid-framework";
import {
  TinyliciousClient,
} from "@fluid-experimental/tinylicious-client";
import { v4 as uuid } from 'uuid';
import { containerConfig, defaultData, serviceConfig } from "../config";
import { FILEPATH } from '../config';

export const createFilePath = (id: string) => {
  return `/${FILEPATH}/${id}`;
}

export const createFluidFile = async () => {
  const id = uuid();
  const fluidContainer = (await TinyliciousClient.createContainer({ ...serviceConfig, id }, containerConfig))[0];
  const map = fluidContainer.initialObjects.myMap as ISharedMap;
  for (const data of defaultData) {
    map.set(data.id, {value:data.value})
  }
  return createFilePath(id);
}

export const getFluidContainer = async (id: string) => {
  return await TinyliciousClient.getContainer({ ...serviceConfig, id }, containerConfig);
}
