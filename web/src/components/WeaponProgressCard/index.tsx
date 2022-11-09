import React, { useCallback } from "react";

import { FaAngleDoubleDown } from "react-icons/fa";
import { useRecoilValue } from "recoil";

import { upgradeBreakpoints } from "../../data/levelingData";

import {
  lockWeaponsCheckbox,
  lockDesiredCheckbox,
} from "../../recoil/controls/WeaponsPage";
import { weaponStore } from "../../recoil/entities";

import WeaponAvatar from "../WeaponAvatar";

import {
  Avatar,
  WeaponElement,
  WeaponInfo,
  WeaponName,
  WeaponNameTooltip,
  WeaponToggle,
  WeaponGrade,
  WeaponRoleIcon,
  Container,
  Filler,
  LevelProgress,
} from "./styles";

const levelOptionsCurrent = [
  { label: "0", value: "0", level: 0, capped: false },
];
const levelOptionsDesired = [
  { label: "0", value: "0", level: 0, capped: false },
];
upgradeBreakpoints.forEach((limit) => {
  for (let i = 9; i > 0; i--) {
    levelOptionsCurrent.push({
      label: `${limit - i}`,
      value: `${limit - i}`,
      level: limit - i,
      capped: false,
    });
  }
  levelOptionsCurrent.push({
    label: `${limit} CAP`,
    value: `${limit} CAP`,
    level: limit,
    capped: true,
  });
  levelOptionsCurrent.push({
    label: `${limit} UPG`,
    value: `${limit} UPG`,
    level: limit,
    capped: false,
  });
  levelOptionsDesired.push({
    label: `${limit} CAP`,
    value: `${limit} CAP`,
    level: limit,
    capped: true,
  });
  levelOptionsDesired.push({
    label: `${limit} UPG`,
    value: `${limit} UPG`,
    level: limit,
    capped: false,
  });
});

interface LevelData {
  level: number;
  capped: boolean;
}

const optionForLevel = ({ level, capped }: LevelData): string => {
  const found = levelOptionsCurrent.find(
    (item) => item.level === level && item.capped === capped
  );
  return found ? found.value : "0";
};

const levelForOption = (value: string): LevelData => {
  const found = levelOptionsCurrent.find((item) => item.value === value);
  return found
    ? { level: found.level, capped: found.capped }
    : { level: 0, capped: false };
};

interface WeaponProgressCardProps {
  weaponId: string;
}

const WeaponProgressCard: React.FC<WeaponProgressCardProps> = ({
  weaponId,
}) => {
  const weapon = weaponStore.useEntityValue(weaponId);
  const patchWeapon = weaponStore.usePatchEntity(weaponId);

  const lockWeapon = useRecoilValue(lockWeaponsCheckbox);
  const lockDesired = useRecoilValue(lockDesiredCheckbox);

  const toggleEnabled = useCallback(() => {
    patchWeapon({ enabled: !weapon.enabled });
  }, [weapon, patchWeapon]);

  const handleCurrentLevelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const current = levelForOption(event.target.value);
      const patch = { upgrade: { current, desired: weapon.upgrade.desired } };
      if (
        current.level > weapon.upgrade.desired.level ||
        (current.level === weapon.upgrade.desired.level && !current.capped)
      ) {
        patch.upgrade.desired = current;
      }
      patchWeapon(patch);
    },
    [weapon, patchWeapon]
  );

  const handleDesiredLevelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const desired = levelForOption(event.target.value);
      const patch = { upgrade: { current: weapon.upgrade.current, desired } };
      if (
        desired.level < weapon.upgrade.current.level ||
        (desired.level === weapon.upgrade.current.level && desired.capped)
      ) {
        patch.upgrade.current = desired;
      }
      patchWeapon(patch);
    },
    [weapon, patchWeapon]
  );

  return (
    <Container enabled={weapon.enabled}>
      <WeaponInfo>
        <WeaponName>
          {weapon.name} | {weapon.character}
        </WeaponName>
        <WeaponNameTooltip>
          {weapon.name} | {weapon.character}
        </WeaponNameTooltip>
        <WeaponToggle>
          <input
            aria-label={`Toggle tracking of ${weapon.name}`}
            type="checkbox"
            checked={weapon.enabled}
            onChange={toggleEnabled}
            className="visuallyhidden"
            disabled={lockWeapon}
          />
          <span />
        </WeaponToggle>
        <Filler />
        <WeaponGrade data-title={weapon.rarity.toString()} />
        <WeaponElement data-title={weapon.element}>
          <span className="visuallyhidden">{weapon.element}</span>
        </WeaponElement>
        <WeaponRoleIcon data-title={weapon.role}>
          <span className="visuallyhidden">{weapon.role}</span>
        </WeaponRoleIcon>
      </WeaponInfo>
      <Avatar enabled={weapon.enabled}>
        <WeaponAvatar weaponId={weapon.id} />
      </Avatar>
      <LevelProgress>
        <legend>Level</legend>
        <select
          aria-label={`${weapon.name}'s current level`}
          value={optionForLevel(weapon.upgrade.current)}
          onChange={handleCurrentLevelChange}
          onBlur={handleCurrentLevelChange}
          disabled={!weapon.enabled}
        >
          {levelOptionsCurrent.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span>
          <FaAngleDoubleDown />
        </span>
        <select
          aria-label={`${weapon.name}'s desired level`}
          value={optionForLevel(weapon.upgrade.desired)}
          onChange={handleDesiredLevelChange}
          onBlur={handleDesiredLevelChange}
          disabled={!weapon.enabled || lockDesired}
        >
          {levelOptionsDesired.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </LevelProgress>
    </Container>
  );
};

export default WeaponProgressCard;
