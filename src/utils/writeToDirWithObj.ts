import {
  ISharedDirectory,
  IDirectory
} from "@fluid-experimental/fluid-framework";

// Create A Node
export const writeToDirWithObj = (
  id: string,
  nodeProps: Record<string, any>,
  directory: ISharedDirectory | IDirectory,
  isNew?: boolean
) => {
  const newDir = directory.createSubDirectory(id);
  for (const key in nodeProps) {
    typeof(nodeProps[key]) === "object" && !Array.isArray(nodeProps[key])
      ? writeToDirWithObj(key, nodeProps[key], newDir, isNew)
      : newDir.set(key, nodeProps[key]);
  }
};
