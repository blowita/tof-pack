import { atom } from "recoil";

import { localStorageEffect } from "../helper";

export const hideUncheckedCheckbox = atom({
  key: "@ToFPack/WeaponsPage/hideUncheckedCheckbox",
  default: false,
  effects_UNSTABLE: [
    localStorageEffect({
      key: "@ToFPack/WeaponsPage__hideUncheckedCheckbox",
      restorer: (value, defaultValue) =>
        typeof value === "boolean" ? value : defaultValue,
    }),
  ],
});

export const lockWeaponsCheckbox = atom({
  key: "@ToFPack/WeaponsPage/lockWeaponsCheckbox",
  default: false,
  effects_UNSTABLE: [
    localStorageEffect({
      key: "@ToFPack/WeaponsPage__lockWeaponsCheckbox",
      restorer: (value, defaultValue) =>
        typeof value === "boolean" ? value : defaultValue,
    }),
  ],
});

export const lockDesiredCheckbox = atom({
  key: "@ToFPack/WeaponsPage/lockDesiredCheckbox",
  default: false,
  effects_UNSTABLE: [
    localStorageEffect({
      key: "@ToFPack/WeaponsPage__lockDesiredCheckbox",
      restorer: (value, defaultValue) =>
        typeof value === "boolean" ? value : defaultValue,
    }),
  ],
});
