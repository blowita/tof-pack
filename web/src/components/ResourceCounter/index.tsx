import React, { useCallback, useMemo, useState } from "react";

import { GrUpgrade } from "react-icons/gr";
import { TiMinus, TiPlus } from "react-icons/ti";

import { resourceStore } from "../../recoil/entities";
import { useResourceTarget } from "../../recoil/hooks/resourceTarget";

import {
  Actions,
  Container,
  Counter,
  Cover,
  CoverImage,
  Filler,
} from "./styles";

const upgradable = false;

const integerRegexp = /^[0-9]*$/;

interface ResourceCounterProps {
  resourceId: string;
}

const ResourceCounter: React.FC<ResourceCounterProps> = ({ resourceId }) => {
  const [hideButtons, setHideButtons] = useState(true);

  const resource = resourceStore.useEntityValue(resourceId);
  const patchResource = resourceStore.usePatchEntity(resourceId);

  const { target } = useResourceTarget(resourceId);

  const increment = useCallback(
    () => patchResource({ stock: Math.min(resource.stock + 1, 9999) }),
    [patchResource, resource]
  );

  const decrement = useCallback(
    () => patchResource({ stock: Math.max(resource.stock - 1, 0) }),
    [patchResource, resource]
  );

  const changeCounter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (integerRegexp.test(event.target.value)) {
        const input = Number(event.target.value);
        if (input >= 0 && input < 10000) {
          patchResource({ stock: input });
        }
      }
    },
    [patchResource]
  );

  const name = useMemo(
    () => `${resource.name} (${resource.type} - rarity ${resource.rarity})`,
    [resource]
  );

  const fulfilled = useMemo(() => {
    return !target || resource.stock >= target;
  }, [resource, target]);

  return (
    <Container
      onMouseEnter={() => setHideButtons(false)}
      onMouseLeave={() => setHideButtons(true)}
    >
      <Cover resourceRarity={resource.rarity}>
        <CoverImage resourceImageUrl={resource.imageUrl}>
          <Actions hidden={hideButtons}>
            <button
              type="button"
              className="plus"
              tabIndex={-1}
              onClick={increment}
              aria-label={`Increment ${name} stored amount`}
            >
              <TiPlus />
            </button>
            <button
              type="button"
              className="minus"
              tabIndex={-1}
              onClick={decrement}
              aria-label={`Decrement ${name} stored amount`}
            >
              <TiMinus />
            </button>
            {upgradable && (
              <button
                type="button"
                className="upgrade"
                tabIndex={-1}
                onClick={() => null}
                aria-label={`Show ${name} rarity upgrade screen`}
              >
                <GrUpgrade />
              </button>
            )}
          </Actions>
          <Filler />
        </CoverImage>
      </Cover>
      <Counter>
        <input
          value={resource.stock}
          onChange={changeCounter}
          size={3}
          aria-label={`${name} stored amount`}
        />
        <span>/</span>
        <span
          className={fulfilled ? "fulfilled" : "required"}
          aria-label={`${name} required amount`}
        >
          {target || "-"}
        </span>
      </Counter>
    </Container>
  );
};

export default ResourceCounter;
