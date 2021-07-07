import {
  SharedDirectory,
} from "@fluid-experimental/fluid-framework";

export const containerConfig = {
  name: "cra-demo-container",
  initialObjects: {
    myDir: SharedDirectory,
  },
};

export const FILEPATH  = 'fluid';

export const serviceConfig = {};

export const defaultData: any[] = [
  {
    id: "root",
    topic: "node topic",
    tags: ["Cool"],
    style: {
      background: "#333",
      color: "000",
      fontSize: "32",
      fontWeight: "bold",
    },
  },
  {
    id: "child123",
    topic: "node topic",
    tags: ["Cool"],
  },
];