import React, { useCallback, useMemo } from "react";

import { ResourceId } from "../../data/resources";

import { resourceStore } from "../../recoil/entities";
import { useGoldTarget } from "../../recoil/hooks/goldTarget";

import { Container, Counter, Cover, CoverImage, Filler } from "./styles";

const integerRegexp = /^[0-9]*$/;

const GoldCounter: React.FC = () => {
  const resource = resourceStore.useEntityValue(ResourceId.Gold);
  const patchResource = resourceStore.usePatchEntity(ResourceId.Gold);

  const { gold: target } = useGoldTarget();

  const changeCounter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (integerRegexp.test(event.target.value)) {
        const input = Number(event.target.value);
        if (input >= 0 && input < 1000000000) {
          patchResource({ stock: input });
        }
      }
    },
    [patchResource]
  );

  const fulfilled = useMemo(() => {
    return !target || resource.stock >= target;
  }, [resource, target]);

  return (
    <Container>
      <Cover resourceRarity={resource.rarity}>
        <CoverImage resourceImageUrl={resource ? resource.imageUrl : ""}>
          <Filler />
        </CoverImage>
      </Cover>
      <Counter>
        <input
          value={resource.stock}
          onChange={changeCounter}
          size={7}
          aria-label="Amount of Gold acquired."
        />
        <span
          className={fulfilled ? "fulfilled" : "required"}
          aria-label="Amount of Gold required."
        >
          {target || "-"}
        </span>
      </Counter>
    </Container>
  );
};

export default GoldCounter;
