import { Weapon as WeaponInfo, weapons } from "../../data/weapons";

import { createEntityStore } from "./store";

export interface UpgradeTracking {
  current: {
    level: number;
    capped: boolean;
  };
  desired: {
    level: number;
    capped: boolean;
  };
}

interface WeaponState {
  formatVersion: string;
  enabled: boolean;
  upgrade: UpgradeTracking;
}

export type WeaponEntity = WeaponInfo & WeaponState;

const currentFormatVersion = "1.0";

const generateWeapon = (id: string): WeaponEntity => {
  const weapon = weapons.find((c) => c.id === id);

  if (!weapon) {
    throw new Error(`Weapon with id ${id} doesn't exist`);
  }

  return {
    ...weapon,
    formatVersion: currentFormatVersion,
    enabled: false,
    upgrade: {
      current: { level: 0, capped: false },
      desired: { level: 150, capped: true },
    },
  };
};

interface WeaponStorage extends WeaponState {
  id: string;
  name: string;
}

const preLocalStorageSet = (value: WeaponEntity): WeaponStorage => ({
  id: value.id,
  name: value.name,
  formatVersion: value.formatVersion,
  enabled: value.enabled,
  upgrade: value.upgrade,
});

interface WeaponStorage1v0 {
  id: string;
  name: string;
  formatVersion: number;
  enabled: boolean;
  upgrade: UpgradeTracking;
}

type DeprecatedWeaponStorageTypes = WeaponStorage1v0;

const fixFormatVersion = (
  parsed: DeprecatedWeaponStorageTypes | WeaponStorage | undefined
): WeaponStorage => {
  if (!parsed) {
    throw new Error("Unable to parse stored data for a weapon");
  }
  if (parsed.formatVersion) {
    let bumped: DeprecatedWeaponStorageTypes | WeaponStorage | undefined;
    switch (parsed.formatVersion) {
      case currentFormatVersion:
        return parsed as WeaponStorage;
      case "1.0": {
        const deprecated = parsed as WeaponStorage1v0;
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
    `Unable to parse stored data for weapon with id ${parsed.id}`
  );
};

const postLocalStorageGet = (parsed: WeaponStorage): WeaponEntity => {
  const weaponInfo = weapons.find((i) => i.id === parsed.id);

  if (!weaponInfo) {
    throw new Error(
      `Unable to parse stored data for weapon with id ${parsed.id}`
    );
  }

  return {
    ...fixFormatVersion(parsed),
    ...weaponInfo,
  };
};

export default createEntityStore<WeaponEntity, WeaponStorage>(
  "weapon",
  generateWeapon,
  preLocalStorageSet,
  postLocalStorageGet
);
