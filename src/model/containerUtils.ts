import {
  TinyliciousClient,
} from "@fluid-experimental/tinylicious-client";
import { v4 as uuid } from 'uuid';
import { containerConfig, serviceConfig } from "./config";


export const createFluidContainer = async () => {
  const id = uuid();
  await TinyliciousClient.createContainer({ ...serviceConfig, id }, containerConfig);
  return id;
}

export const getFluidContainer = async (id: string) => {
  return await TinyliciousClient.getContainer({ ...serviceConfig, id }, containerConfig);
}
