import {
  ISharedDirectory,
} from "@fluid-experimental/fluid-framework";


export interface Node {
  id: string;
  [key: string]: any;
}

export interface InitialObjects {
  myDir: ISharedDirectory;
}