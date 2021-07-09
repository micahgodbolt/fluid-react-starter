import { ISharedMap, FluidContainer } from "@fluid-experimental/fluid-framework";
import { EventEmitter } from "events";
import { FrsContainerServices } from "@fluid-experimental/frs-client";
import { Node } from "./types";

export class FluidModel extends EventEmitter {
  private map: ISharedMap;
  constructor(private container: FluidContainer, private services: FrsContainerServices) {
    super();
    this.map = container.initialObjects.myMap as ISharedMap;
    this.map.on("valueChanged", (changed, local, op, target) => {
      this.emit("anyChanged");
      this.emit(`${changed.key}Changed`);
    })    
  }

  public getAllNodeIds = (): string[] => {
    return Array.from(this.map.keys());
  }

  public getNode = (id: string): Node => {
    const node = this.map.get<Node>(id);
    if (node === undefined) {
      throw Error(`${id} not found`);
    }
    return node;
  }


  public editNode = (id: string, data: Partial<Node>) => {
    this.map.set(id, data);
  }

  public createNode = (id: string, data: Node) => {
    if (this.map.get(id)) {
      // id already exists
      return;
    }
    this.map.set(id, data);
  }
}




