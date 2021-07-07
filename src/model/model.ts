import { ISharedDirectory } from "@fluid-experimental/fluid-framework";
import { EventEmitter } from "events";
import {
  TinyliciousContainerServices,
} from "@fluid-experimental/tinylicious-client";
import { FluidContainer } from "@fluid-experimental/fluid-static";
import { Node } from "./types";
import {v4 as uuid} from "uuid";


export class FluidModel extends EventEmitter {
  private dir: ISharedDirectory;
  constructor(private container: FluidContainer, private services: TinyliciousContainerServices) {
    super();
    this.dir = container.initialObjects.myDir as ISharedDirectory;
    this.dir.on("valueChanged", (changed, local, op, target) => {
      this.emit("anyChanged");
    })    
  }

  public getAllNodes = () => {
  }

  public editNode = (id: string, data: Partial<Node>) => {
  }

  public createNode = (data: Node) => {
    if (this.dir.get(data.id)) {
      // id already exists
      return;
    }
   
  }
}




