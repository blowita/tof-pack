import React, { useCallback } from "react";

import FlatList from "flatlist-react";
import { useRecoilState } from "recoil";

import { WeaponProgressCard } from "../../components";

import { weaponIds } from "../../data/weapons";

import {
  hideUncheckedCheckbox,
  lockWeaponsCheckbox,
  lockDesiredCheckbox,
} from "../../recoil/controls/WeaponsPage";
import { weaponStore, WeaponEntity } from "../../recoil/entities";

import { Container, Content, Controls } from "./styles";

const renderWeaponProgressCard = (
  weapon: WeaponEntity,
  key: number
): JSX.Element => <WeaponProgressCard weaponId={weapon.id} key={key} />;

const WeaponsPage: React.FC = () => {
  const weaponList = weaponStore.useEntityList(weaponIds);

  const [hideUnchecked, setHideUnchecked] = useRecoilState(
    hideUncheckedCheckbox
  );
  const [lockWeapons, setLockWeapons] = useRecoilState(lockWeaponsCheckbox);
  const [lockDesired, setLockDesired] = useRecoilState(lockDesiredCheckbox);

  const toggleHideUnchecked = useCallback(
    () => setHideUnchecked((value) => !value),
    [setHideUnchecked]
  );

  const toggleLockWeapons = useCallback(
    () => setLockWeapons((value) => !value),
    [setLockWeapons]
  );

  const toggleLockDesired = useCallback(
    () => setLockDesired((value) => !value),
    [setLockDesired]
  );

  const filter = useCallback(
    (weapon: WeaponEntity) => !hideUnchecked || weapon.enabled,
    [hideUnchecked]
  );

  return (
    <Container>
      <Controls>
        <label>
          <input
            type="checkbox"
            checked={hideUnchecked}
            onChange={toggleHideUnchecked}
          />
          <span>Show only weapons you marked</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={lockWeapons}
            onChange={toggleLockWeapons}
          />
          <span>Lock weapons</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={lockDesired}
            onChange={toggleLockDesired}
          />
          <span>Lock desired</span>
        </label>
      </Controls>
      <Content>
        <FlatList
          list={weaponList}
          renderItem={renderWeaponProgressCard}
          renderOnScroll
          wrapperHtmlTag="div"
          renderWhenEmpty={() => <span>No items available.</span>}
          sortBy={["sortId"]}
          filterBy={filter}
        />
      </Content>
    </Container>
  );
};

export default WeaponsPage;
