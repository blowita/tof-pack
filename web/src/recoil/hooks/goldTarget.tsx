import { WeaponEntity, weaponStore } from "../entities";

import { WeaponId, weaponIds } from "../../data/weapons";
import { weaponExpTable, upgradeCostTally } from "../../data/levelingData";

const calculateGoldForWeapon = (weapon: WeaponEntity): number => {
  let target =
    weaponExpTable[weapon.upgrade.desired.level] -
    weaponExpTable[weapon.upgrade.current.level];

  target += upgradeCostTally({
    rarity: weapon.rarity,
    ...weapon.upgrade.desired,
    lin: weapon.id === WeaponId.Shadoweave,
  });

  target -= upgradeCostTally({
    rarity: weapon.rarity,
    ...weapon.upgrade.current,
    lin: weapon.id === WeaponId.Shadoweave,
  });

  return target;
};

const useGoldTarget = (): { gold: number } => {
  const weapons = weaponStore.useEntityList(weaponIds);

  const calculateGoldTarget = (): number => {
    return weapons.reduce((sum, weapon) => {
      const gold = weapon.enabled ? calculateGoldForWeapon(weapon) : 0;
      return sum + gold;
    }, 0);
  };

  return {
    gold: calculateGoldTarget(),
  };
};

export { useGoldTarget };
