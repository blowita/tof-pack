import { WeaponEntity, weaponStore, resourceStore } from "../entities";

import { weaponIds } from "../../data/weapons";
import { weaponExpTable } from "../../data/levelingData";

const calculateWeaponExpForWeapon = (weapon: WeaponEntity): number => {
  return (
    weaponExpTable[weapon.upgrade.desired.level] -
    weaponExpTable[weapon.upgrade.current.level]
  );
};

const useWeaponExpTarget = (rarity: number): { weaponExpBatteries: number } => {
  const weapons = weaponStore.useEntityList(weaponIds);
  const rarity4XpBattery = resourceStore.useEntityValue(
    "980840b2-b68a-4f5b-8ec8-ea1a7feb07fb"
  );
  const rarity3XpBattery = resourceStore.useEntityValue(
    "6efcc643-6ba1-46d8-b8e3-bc534ce868f1"
  );
  const rarity2XpBattery = resourceStore.useEntityValue(
    "3bf43090-9ee8-4b45-825f-c3b19b420f95"
  );
  const rarity1XpBattery = resourceStore.useEntityValue(
    "b774aa88-e050-49ca-9d23-8ba8669664e6"
  );

  const calculateWeaponExpTarget = (): number => {
    return weapons.reduce((sum, weapon) => {
      const weaponExp = weapon.enabled
        ? calculateWeaponExpForWeapon(weapon)
        : 0;
      return sum + weaponExp;
    }, 0);
  };

  const weaponExpTargetScaledDown = Math.ceil(calculateWeaponExpTarget() / 20);

  if (!weaponExpTargetScaledDown) {
    return { weaponExpBatteries: 0 };
  }

  const usableStock4 = Math.min(
    rarity4XpBattery.stock,
    Math.floor(weaponExpTargetScaledDown / 50)
  );
  const usableStock3 = Math.min(
    rarity3XpBattery.stock,
    Math.floor((weaponExpTargetScaledDown - usableStock4 * 50) / 12.5)
  );
  const usableStock2 = Math.min(
    rarity2XpBattery.stock,
    Math.floor(
      (weaponExpTargetScaledDown - usableStock4 * 50 - usableStock3 * 12.5) /
        3.75
    )
  );
  const usableStock1 = Math.min(
    rarity1XpBattery.stock,
    weaponExpTargetScaledDown -
      usableStock4 * 50 -
      usableStock3 * 12.5 -
      usableStock2 * 3.75
  );

  let mustFit =
    weaponExpTargetScaledDown -
    usableStock4 * 50 -
    usableStock3 * 12.5 -
    usableStock2 * 3.75 -
    usableStock1;

  const target4 = usableStock4 + Math.floor(mustFit / 50);
  mustFit -= 50 * Math.floor(mustFit / 50);

  const target3 = usableStock3 + Math.floor(mustFit / 12.5);
  mustFit -= 12.5 * Math.floor(mustFit / 12.5);

  const target2 = usableStock2 + Math.floor(mustFit / 3.75);
  mustFit -= 3.75 * Math.floor(mustFit / 3.75);

  switch (rarity) {
    case 4:
      return { weaponExpBatteries: target4 };
    case 3:
      return { weaponExpBatteries: target3 };
    case 2:
      return { weaponExpBatteries: target2 };
    case 1:
      return { weaponExpBatteries: Math.ceil(usableStock1 + mustFit) };
    default:
      return { weaponExpBatteries: 0 };
  }
};

export { useWeaponExpTarget };
