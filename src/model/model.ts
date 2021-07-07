import { ISharedMap } from "@fluid-experimental/fluid-framework";
import { EventEmitter } from "events";
import {
  TinyliciousContainerServices,
} from "@fluid-experimental/tinylicious-client";
import { FluidContainer } from "@fluid-experimental/fluid-static";
import { Node } from "./types";


export class FluidModel extends EventEmitter {
  private map: ISharedMap;
  constructor(private container: FluidContainer, private services: TinyliciousContainerServices) {
    super();
    this.map = container.initialObjects.myMap as ISharedMap;
    this.map.on("valueChanged", (changed, local, op, target) => {
      this.emit("anyChanged");
    })    
  }

  public getAllNodes = () => {
    return Array.from(this.map.values());
  }

  public editNode = (id: string, data: Node) => {
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




