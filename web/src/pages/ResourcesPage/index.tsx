import React from "react";

import FlatList from "flatlist-react";

import {
  WeaponExpCounter,
  GoldCounter,
  ResourceCounter,
} from "../../components";

import { Resource, ResourceId, resources } from "../../data/resources";

import { Container, Content } from "./styles";

const renderResourceListItem = (
  resource: Resource,
  key: number
): JSX.Element => {
  switch (resource.id) {
    case ResourceId.Gold:
      return <GoldCounter key={key} />;
    case ResourceId.WeaponBatteryI:
      return <WeaponExpCounter resourceId={resource.id} key={key} />;
    case ResourceId.WeaponBatteryII:
      return <WeaponExpCounter resourceId={resource.id} key={key} />;
    case ResourceId.WeaponBatteryIII:
      return <WeaponExpCounter resourceId={resource.id} key={key} />;
    case ResourceId.WeaponBatteryIV:
      return <WeaponExpCounter resourceId={resource.id} key={key} />;
    default:
      return <ResourceCounter resourceId={resource.id} key={key} />;
  }
};

const ResourcesPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <FlatList
          list={resources}
          renderItem={renderResourceListItem}
          renderOnScroll
          wrapperHtmlTag="div"
          renderWhenEmpty={() => <span>No items available.</span>}
          sortBy={["sortId"]}
        />
      </Content>
    </Container>
  );
};

export default ResourcesPage;
