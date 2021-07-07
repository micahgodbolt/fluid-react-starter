import {
  TinyliciousClient,
} from "@fluid-experimental/tinylicious-client";
import { v4 as uuid } from 'uuid';
import { containerConfig, serviceConfig } from "../config";
import { FILEPATH } from '../config';

export const createFilePath = (id: string) => {
  return `/${FILEPATH}/${id}`;
}

export const createFluidFile = async () => {
  const id = uuid();
  await TinyliciousClient.createContainer({ ...serviceConfig, id }, containerConfig);
  return createFilePath(id);
}

export const getFluidContainer = async (id: string) => {
  return await TinyliciousClient.getContainer({ ...serviceConfig, id }, containerConfig);
}
