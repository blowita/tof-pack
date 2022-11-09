import React, { useState } from "react";

import { weapons } from "../../data/weapons";

import { Container, WeaponImage } from "./styles";

interface WeaponAvatarProps {
  weaponId: string;
}

const WeaponAvatar: React.FC<WeaponAvatarProps> = ({ weaponId }) => {
  const [toggle, setToggle] = useState(false);

  const weapon = weapons.find((c) => c.id === weaponId);

  return weapon ? (
    <Container weaponRarity={weapon.rarity} onClick={() => setToggle(!toggle)}>
      {toggle ? (
        <WeaponImage weaponImageUrl={weapon.imageUrl2} />
      ) : (
        <WeaponImage weaponImageUrl={weapon.imageUrl1} />
      )}
    </Container>
  ) : (
    <Container weaponRarity={0}>
      <WeaponImage weaponImageUrl="/tof-pack/static/images/avatar/Avatar_Unknown.png" />
    </Container>
  );
};

export default WeaponAvatar;
