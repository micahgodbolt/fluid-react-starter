import { ISharedMap, FluidContainer, IValueChanged } from '@fluid-experimental/fluid-framework';
import { EventEmitter } from 'events';
import { FrsContainerServices } from '@fluid-experimental/frs-client';
import { Node } from './types';

type EventPayload = {
  type: string;
  changed: IValueChanged;
};

export class FluidModel extends EventEmitter {
  private map: ISharedMap;
  constructor(private container: FluidContainer, private services: FrsContainerServices) {
    super();
    this.map = container.initialObjects.myMap as ISharedMap;
    this.map.on("valueChanged", (changed, local, op, target) => {
      if (!this.checkIfNodeExists(changed.key)) {
        this.emit("modelChanged", {type: "singleDelete", key: changed.key});
      } else {
        const payload ={type: "singleChange", key: changed.key}
        this.emit("modelChanged", payload);
      }
    })       
  }

  public getAllNodeIds = (): string[] => {
    return Array.from(this.map.keys());
  };

  private checkIfNodeExists = (id: string) => {
    return this.getAllNodeIds().includes(id)
  }

  public getNode = (id: string): Node => {
    const node = this.map.get<Node>(id);
    if (node === undefined) {
      throw Error(`${id} not found`);
    }
    return node;
  };

  public getAllNodes = () => {
    const nodeIds = this.getAllNodeIds();
    const nodes: Record<string, Node> = {};
    for (const id of nodeIds) {
      nodes[id] = this.getNode(id);
    }
    return nodes;
  };

  public editNode = (id: string, data: Partial<Node>) => {
    this.map.set(id, data);
  };

  public deleteNode = (id:string) => {
    this.map.delete(id);
  }

  public createNode = (id: string, data: Node) => {
    if (this.map.get(id)) {
      // id already exists
      return;
    }
    this.map.set(id, data);
  };
}
