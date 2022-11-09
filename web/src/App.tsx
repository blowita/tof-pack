import React from "react";

import { RecoilRoot } from "recoil";

import Routes from "./routes";

import GlobalStyle from "./styles/global";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </>
);

export default App;
