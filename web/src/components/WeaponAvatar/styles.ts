import styled, { css } from "styled-components";

interface WeaponAvatarProps {
  weaponRarity: number;
}

interface WeaponImageProps {
  weaponImageUrl: string;
}

const handleRarityType = (rarity: number): string => {
  switch (rarity) {
    case 5:
      return "#cc9000";
    case 4:
      return "#886faa";
    case 3:
      return "#6faacc";
    case 2:
      return "#6faa88";
    default:
      return "#aaaaaa";
  }
};

const handleRarityBackground = (rarity: number): string => {
  switch (rarity) {
    case 5:
      return "/tof-pack/static/images/background/BG_Rarity_5.png";
    case 4:
      return "/tof-pack/static/images/background/BG_Rarity_4.png";
    case 3:
      return "/tof-pack/static/images/background/BG_Rarity_3.png";
    case 2:
      return "/tof-pack/static/images/background/BG_Rarity_2.png";
    default:
      return "/tof-pack/static/images/background/BG_Rarity_1.png";
  }
};

export const Container = styled.div<WeaponAvatarProps>`
  width: 4em;
  height: 4em;

  padding: 0.1em;
  border-radius: 0.3em;

  background-color: ${(props) => handleRarityType(props.weaponRarity)};

  ${(props) => css`
    background-image: url(${handleRarityBackground(props.weaponRarity)});
  `}

  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-origin: content-box;

  position: relative;
`;

export const WeaponImage = styled.div<WeaponImageProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;

  ${(props) =>
    props.weaponImageUrl &&
    css`
      background-image: url(${props.weaponImageUrl});
    `}
  background-size: 125%;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
`;
