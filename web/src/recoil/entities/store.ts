/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback } from "react";

/* Reference: https://github.com/facebookexperimental/Recoil/issues/746 */

import {
  AtomEffect,
  atomFamily,
  DefaultValue,
  RecoilState,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export interface EntityStore<E> {
  name: string;
  usePutEntity: () => (key: string, entity: E) => void;
  useEntityValue: (key: string) => E;
  useEntityProperty: <P extends keyof E>(key: string, property: P) => void;
  useEntityList: (keys: string[]) => E[];
  useSetEntity: (key: string) => (updater: E | ((current: E) => E)) => void;
  usePatchEntity: (key: string) => (patch: Partial<E>) => void;
}

interface StoreInternals {
  family: (key: string) => RecoilState<any>;
}

const UNWRAP_STORE = new Map<string, StoreInternals>();

export function createEntityStore<E, F>(
  name: string,
  defaultValueFallbackFunction: (key: string) => E,
  preLocalStorageSet: (value: E) => F,
  postLocalStorageGet: (parsed: F) => E
): EntityStore<E> {
  if (UNWRAP_STORE.has(name)) {
    console.warn(`Entity store ${name} was redefined`);
  }

  const localStorageEffect: AtomEffect<E> = ({ node, setSelf, onSet }) => {
    const savedValue = localStorage.getItem(node.key);
    if (savedValue) {
      setSelf(postLocalStorageGet(JSON.parse(savedValue)));
    }

    onSet((newValue: E | DefaultValue | null) => {
      if (!newValue || newValue instanceof DefaultValue) {
        localStorage.removeItem(node.key);
      } else {
        localStorage.setItem(
          node.key,
          JSON.stringify(preLocalStorageSet(newValue))
        );
      }
    });
  };

  const family = atomFamily<E, string>({
    key: `@ToFPack/${name}`,
    default: defaultValueFallbackFunction,
    effects_UNSTABLE: [localStorageEffect],
  });

  const listSelectorFamily = selectorFamily({
    key: `@ToFPack/${name}/list`,
    get: (keys: string[]) => ({ get }) => {
      const toEntity = (key: string) => {
        const value = get(family(key));

        if (!value) {
          throw new Error(`${name} with key ${key} doesn't exist`);
        }

        return value;
      };
      return keys.map(toEntity);
    },
  });

  const propertySelectorFamily = selectorFamily({
    key: `@ToFPack/${name}/property`,
    get: ([key, property]: [string, keyof E]) => ({ get }) => {
      const entity = get(family(key));

      if (!entity) {
        throw new Error(`${name} with key ${key} doesn't exist`);
      }

      return entity[property];
    },
  });

  UNWRAP_STORE.set(name, { family });

  const usePutEntity = () => {
    const put = useRecoilCallback(
      ({ set }) => (key: string, entity: E) => {
        set(family(key), entity);
      },
      []
    );
    return put;
  };

  const useEntityValue = (key: string) => {
    const value = useRecoilValue(family(key));

    if (!value) {
      throw new Error(`${name} with key ${key} doesn't exist`);
    }

    return value;
  };

  const useEntityProperty = <P extends keyof E>(key: string, property: P) => {
    return useRecoilValue(propertySelectorFamily([key, property])) as E[P];
  };

  const useEntityList = (keys: string[]) =>
    useRecoilValue(listSelectorFamily(keys));

  const useSetEntity = (key: string) => {
    const set = useSetRecoilState(family(key));
    const setEntity = useCallback(
      (updater: E | ((current: E) => E)) => {
        const update = (current: E | null) => {
          if (!current) {
            throw new Error(`${name} with key ${key} doesn't exist`);
          }

          return typeof updater === "function"
            ? (updater as any)(current)
            : updater;
        };
        set(update);
      },
      [key, set]
    );
    return setEntity;
  };

  const usePatchEntity = (key: string) => {
    const set = useSetEntity(key);
    const patch = useCallback(
      (patch: Partial<E>) => {
        const merge = (current: E | null) => {
          if (!current) {
            throw new Error(`${name} with key ${key} doesn't exist`);
          }

          return { ...current, ...patch };
        };
        set(merge);
      },
      [key, set]
    );
    return patch;
  };

  return {
    name,
    usePutEntity,
    useEntityValue,
    useEntityProperty,
    useEntityList,
    useSetEntity,
    usePatchEntity,
  };
}
