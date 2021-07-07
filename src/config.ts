import {
  SharedMap,
} from "@fluid-experimental/fluid-framework";

export const containerConfig = {
  name: "cra-demo-container",
  initialObjects: {
    myMap: SharedMap,
  },
};

export const FILEPATH  = 'fluid';

export const serviceConfig = {};

export const defaultData: any[] = [
  {
    id: "1",
    value: 1,
  },
  {
    id: "2",
    value: 2,
  }
];