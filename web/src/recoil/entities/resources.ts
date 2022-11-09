import { Resource as ResourceInfo, resources } from "../../data/resources";

import { createEntityStore } from "./store";

interface ResourceState {
  formatVersion: string;
  stock: number;
}

export type ResourceEntity = ResourceInfo & ResourceState;

const currentFormatVersion = "1.0";

const generateResource = (id: string): ResourceEntity => {
  const resource = resources.find((c) => c.id === id);

  if (!resource) {
    throw new Error(`Resource with id ${id} doesn't exist`);
  }

  return {
    ...resource,
    formatVersion: currentFormatVersion,
    stock: 0,
  };
};

interface ResourceStorage extends ResourceState {
  id: string;
  name: string;
}

const preLocalStorageSet = (value: ResourceEntity): ResourceStorage => ({
  id: value.id,
  name: value.name,
  formatVersion: value.formatVersion,
  stock: value.stock,
});

interface ResourceStorage1v0 {
  id: string;
  name: string;
  formatVersion: number;
  stock: number;
}

type DeprecatedResourceStorageTypes = ResourceStorage1v0;

const fixFormatVersion = (
  parsed: DeprecatedResourceStorageTypes | ResourceStorage | undefined
): ResourceStorage => {
  if (!parsed) {
    throw new Error("Unable to parse stored data for a resource");
  }
  if (parsed.formatVersion) {
    let bumped: DeprecatedResourceStorageTypes | ResourceStorage | undefined;
    switch (parsed.formatVersion) {
      case currentFormatVersion:
        return parsed as ResourceStorage;
      case "1.0": {
        const deprecated = parsed as ResourceStorage1v0;
        bumped = {
          ...deprecated,
          formatVersion: "1.1",
        };
        break;
      }
    }
    return fixFormatVersion(bumped);
  }
  throw new Error(
    `Unable to parse stored data for resource with id ${parsed.id}`
  );
};

const postLocalStorageGet = (parsed: ResourceStorage): ResourceEntity => {
  const resourceInfo = resources.find((i) => i.id === parsed.id);

  if (!resourceInfo) {
    throw new Error(
      `Unable to parse stored data for resource with id ${parsed.id}`
    );
  }

  return {
    ...fixFormatVersion(parsed),
    ...resourceInfo,
  };
};

export default createEntityStore<ResourceEntity, ResourceStorage>(
  "resource",
  generateResource,
  preLocalStorageSet,
  postLocalStorageGet
);
