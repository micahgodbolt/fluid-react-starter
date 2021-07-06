import {
  ISharedDirectory,
  IDirectory
} from "@fluid-experimental/fluid-framework";

export const getDirAsObj = (directory: ISharedDirectory | IDirectory): any => {

  const dirKeys = Array.from(directory.keys());
  const subDirs = Array.from(directory.subdirectories());

  const data: Record<string, any> = {};
  for (const key of dirKeys) {
    data[key] = directory.get(key);
  }

  if (subDirs.length) {
    for (const [id, dir] of subDirs) {
      data[id] = getDirAsObj(dir);
    }
  }
  return data;
};