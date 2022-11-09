import { useCallback } from "react";

import {
  WeaponEntity,
  weaponStore,
  ResourceEntity,
  resourceStore,
} from "../entities";

import { weaponIds } from "../../data/weapons";
import { weaponResourcesMapping } from "../../data/levelingData";

const calculateResourceTargetForWeapon = (
  resource: ResourceEntity,
  weapon: WeaponEntity
): number => {
  let target = 0;

  const resourcesMapping = weaponResourcesMapping[weapon.id];
  if (!resourcesMapping) {
    return 0;
  }

  const upgradeMapping = resourcesMapping[resource.id];
  if (upgradeMapping) {
    let current = Math.trunc(weapon.upgrade.current.level / 10);
    if (weapon.upgrade.current.capped) {
      current -= 1;
    }

    let desired = Math.trunc(weapon.upgrade.desired.level / 10);
    if (weapon.upgrade.desired.capped) {
      desired -= 1;
    }

    target += upgradeMapping[desired] - upgradeMapping[current];
  }

  return target;
};

const useResourceTarget = (resourceId: string): { target: number } => {
  const weapons = weaponStore.useEntityList(weaponIds);
  const resource = resourceStore.useEntityValue(resourceId);

  const calculateResourceTarget = useCallback((): number => {
    return weapons.reduce((sum, weapon) => {
      if (weapon.enabled) {
        const required = calculateResourceTargetForWeapon(resource, weapon);
        return sum + required;
      } else {
        return sum;
      }
    }, 0);
  }, [weapons, resource]);

  return { target: calculateResourceTarget() };
};

export { useResourceTarget };
