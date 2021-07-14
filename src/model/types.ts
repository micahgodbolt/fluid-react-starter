import { ISharedMap } from '@fluid-experimental/fluid-framework';

export interface Node {
  value: number;
}

export interface InitialObjects {
  myMap: ISharedMap;
}
