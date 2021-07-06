import { ISharedDirectory } from "@fluid-experimental/fluid-framework";
import { EventEmitter } from "events";
import {
  TinyliciousContainerServices,
} from "@fluid-experimental/tinylicious-client";
import { FluidContainer } from "@fluid-experimental/fluid-static";
import {defaultData} from './config'
import { writeToDirWithObj, getDirAsObj } from "../utils";
import { Node } from "./types";
import {v4 as uuid} from "uuid";


export class FluidModel extends EventEmitter {
  private dir: ISharedDirectory;
  constructor(private container: FluidContainer, private services: TinyliciousContainerServices) {
    super();
    this.dir = container.initialObjects.myDir as ISharedDirectory;
    this.initDefaultData(this.dir)
    this.dir.on("valueChanged", (changed, local, op, target) => {
      this.emit("anyChanged");
    })    
  }

  public getAllNodes = () => {
    return getDirAsObj(this.dir);
  }

  public editNode = (id: string, data: Partial<Node>) => {
    writeToDirWithObj(id, data, this.dir);
  }

  public createNode = (data: Node) => {
    if (this.dir.get(data.id)) {
      // id already exists
      return;
    }
    writeToDirWithObj(uuid(), data, this.dir);
  }

  private initDefaultData = (dir: ISharedDirectory) => {
    if (!dir.keys()) {
      for (const item of defaultData) {
        writeToDirWithObj(item.id, item, dir);
      }
    }
  }

}




