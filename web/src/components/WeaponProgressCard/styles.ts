import styled, { css } from "styled-components";

import { shade } from "polished";

import { ElementType, WeaponRole } from "../../data/weapons";

interface Props {
  enabled: boolean;
}

interface WeaponGradeAttrs {
  "data-title": "5" | "4" | "3";
}

interface WeaponElementAttrs {
  "data-title": ElementType;
}

interface WeaponRoleAttrs {
  "data-title": WeaponRole;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 16rem;

  border: solid 1px;
  border-color: ${(props) => (props.enabled ? "white" : shade(0.4, "white"))};
  border-radius: 0.5rem;
  padding: 0.3rem;

  color: ${(props) => (props.enabled ? "white" : shade(0.4, "white"))};
  background-color: ${(props) =>
    props.enabled ? "#303030" : shade(0.4, "#303030")};
`;

export const WeaponInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;

  min-width: 15rem;
`;

export const WeaponName = styled.span`
  position: relative;
  font-size: 1.3rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  pointer-events: none;

  :after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 1.5rem;
    z-index: 2;
    pointer-events: initial;
  }

  :hover + .tooltip {
    display: block;
    transition: opacity 0.5s ease;
    opacity: 1;
  }
`;

export const WeaponNameTooltip = styled.span.attrs({ className: "tooltip" })`
  z-index: 1;
  display: none;
  position: absolute;
  top: 0;
  left: 0;

  font-size: 1.3rem;
  background-color: #303030;
  padding-right: 0.3rem;

  white-space: nowrap;
  overflow: visible;

  opacity: 0;
  transition: opacity 0.5s ease;
`;

export const WeaponToggle = styled.label`
  position: relative;
  display: block;

  margin-left: 0.3rem;
  width: 2rem;
  min-width: 2rem;
  height: 1.2rem;

  span {
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    cursor: pointer;
    background-color: #cccccc;
    border-radius: 0.6rem;

    transition: 0.4s;

    ::before {
      position: absolute;
      content: "";

      height: 0.8rem;
      width: 0.8rem;
      left: 0.2rem;
      bottom: 0.2rem;

      background-color: white;
      border-radius: 50%;

      transition: 0.4s;
    }
  }

  input:checked + span {
    background-color: #5e916c;
  }

  input:checked + span:before {
    transform: translateX(0.8rem);
  }

  input:disabled + span {
    opacity: 0.2;
  }

  input:focus + span,
  span:hover {
    box-shadow: 0 0 0.8rem #5e916c;
  }
`;

export const Filler = styled.div`
  min-width: 0.2rem;
`;

const getGradeImageUrl = (rarity: string): string => {
  switch (rarity) {
    case "5":
      return "/tof-pack/static/images/grade/Grade_SSR.webp";
    case "4":
      return "/tof-pack/static/images/grade/Grade_SR.webp";
    case "3":
      return "/tof-pack/static/images/grade/Grade_R.webp";
    default:
      return "";
  }
};

export const WeaponGrade = styled.div.attrs(
  ({ "data-title": dataTitle }: WeaponGradeAttrs) => ({
    dataTitle: dataTitle || "3",
  })
)`
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.2rem;

  background-image: url(${(props) => getGradeImageUrl(props.dataTitle)});

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;

  &[data-title]:after {
    display: none;
  }
`;

const elementImageUrls: Record<ElementType, string> = {
  [ElementType.Flame]: "/tof-pack/static/images/element/Element_Flame.webp",
  [ElementType.Frost]: "/tof-pack/static/images/element/Element_Frost.webp",
  [ElementType.Physical]:
    "/tof-pack/static/images/element/Element_Physical.webp",
  [ElementType.Volt]: "/tof-pack/static/images/element/Element_Volt.webp",
  [ElementType.Altered]: "/tof-pack/static/images/element/Element_Altered.webp",
};

const getElementImageUrl = (element: ElementType): string =>
  elementImageUrls[element];

export const WeaponElement = styled.div.attrs(
  ({ "data-title": dataTitle }: WeaponElementAttrs) => ({
    dataTitle: dataTitle || "",
  })
)`
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.2rem;

  background-image: url(${(props) => getElementImageUrl(props.dataTitle)});

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;

  &[data-title]:after {
    top: 1.5rem;
    right: 1rem;

    background-color: white;
    color: black;
    padding: 0 0.2rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const roleImageUrls: Record<WeaponRole, string> = {
  [WeaponRole.Dps]: "/tof-pack/static/images/role/Role_Dps.webp",
  [WeaponRole.Support]: "/tof-pack/static/images/role/Role_Support.webp",
  [WeaponRole.Defense]: "/tof-pack/static/images/role/Role_Defense.webp",
};

const getRoleImageUrl = (role: WeaponRole): string => roleImageUrls[role];

export const WeaponRoleIcon = styled.div.attrs(
  ({ "data-title": dataTitle }: WeaponRoleAttrs) => ({
    dataTitle: dataTitle || "",
  })
)`
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.2rem;

  background-image: url(${(props) => getRoleImageUrl(props.dataTitle)});

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;

  &[data-title]:after {
    top: 1.5rem;
    right: 1rem;

    background-color: white;
    color: black;
    padding: 0 0.2rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

export const Avatar = styled.div<Props>`
  display: flex;
  align-items: center;

  font-size: 1.2rem;
  margin-right: 0.3rem;

  ${(props) =>
    !props.enabled &&
    css`
      opacity: 0.6;
    `}
`;

export const LevelProgress = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

  border-radius: 0.3rem;
  border-color: #ffffff22;
  padding: 0.3rem;

  > select {
    background-color: transparent;
    color: white;
    width: 6rem;
    height: 1.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    margin-left: 0.3rem;
    margin-right: 0.2rem;
    text-align: right;

    option {
      background-color: #303030;
    }
  }
`;
