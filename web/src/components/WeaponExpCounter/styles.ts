import styled, { css } from "styled-components";

import { shade } from "polished";

interface CoverProps {
  resourceRarity: number;
}

interface CoverImageProps {
  resourceImageUrl: string;
}

interface ActionsProps {
  hidden: boolean;
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

export const CoverImage = styled.div.attrs<CoverImageProps>(
  ({ resourceImageUrl }) => ({
    style: { backgroundImage: `url(${resourceImageUrl})` },
  })
)<CoverImageProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  background-size: 125%;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;

  padding: 0.3rem;

  > div:last-of-type {
    width: 100%;
    margin-bottom: -0.1rem;
    font-size: 0.9rem;
  }
`;

export const Actions = styled.div<ActionsProps>`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;

  ${(props) =>
    props.hidden &&
    css`
      visibility: hidden;
    `}

  button {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0.2rem;

    color: #222222;

    transition: background-color 0.2s;

    &.plus {
      background: ${shade(0.2, "#33ff33")};

      &:hover,
      &:focus {
        background: #33ff33;
      }
    }

    &.minus {
      background: ${shade(0.2, "#ff3333")};

      &:hover,
      &:focus {
        background: #ff3333;
      }
    }

    &.upgrade {
      background: ${shade(0.2, "#33ffff")};

      &:hover,
      &:focus {
        background: #33ffff;
      }
    }
  }

  button:not(:nth-of-type(1)):not(:nth-of-type(2)) {
    margin-top: 0.3rem;
  }
`;

export const Filler = styled.div`
  flex-grow: 1;
`;

export const Counter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;
  border-radius: 0 0 0.3rem 0.3rem;

  background: white;
  padding-right: 0.2rem;

  input {
    color: black;
    font-weight: 500;
    border: none;
    background-color: transparent;
    text-align: right;
  }

  span {
    color: black;
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
