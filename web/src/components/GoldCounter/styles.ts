import styled, { css } from "styled-components";

interface CoverProps {
  resourceRarity: number;
}

interface CoverImageProps {
  resourceImageUrl: string;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 5rem;
  height: 6rem;
  border-radius: 0.3rem;

  background: white;
`;

export const Cover = styled.div.attrs<CoverProps>(({ resourceRarity }) => ({
  style: {
    backgroundImage: `url(${handleRarityBackground(resourceRarity)})`,
    backgroundColor: handleRarityType(resourceRarity),
  },
}))<CoverProps>`
  display: flex;
  flex-grow: 1;

  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;
`;

export const CoverImage = styled.div<CoverImageProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 0.3rem;

  ${(props) =>
    props.resourceImageUrl &&
    css`
      background-image: url(${props.resourceImageUrl});
    `}
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;
`;

export const Filler = styled.div`
  flex-grow: 1;
`;

export const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
  border-radius: 0 0 0.3rem 0.3rem;

  background: white;
  padding-right: 0.2rem;

  input {
    color: black;
    font-size: 0.9rem;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    text-align: right;
  }

  span {
    color: black;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: default;

    &.required {
      color: red;
    }

    &.fulfilled {
      color: green;
    }
  }
`;
