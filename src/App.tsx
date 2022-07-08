import React from "react";
import { CotacoesProvider } from "./Hooks/cotacoes";
import { LotesProvider } from "./Hooks/lotes";
import { UserProvider } from "./Hooks/user";
import { VendasProvider } from "./Hooks/vendas";
import { Routes } from "./Routes/index.routes";
import GlobalStyles from "./Styles/global";
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <UserProvider>
        <CotacoesProvider>
          <LotesProvider>
            <VendasProvider>
          <Routes />
          </VendasProvider>
          </LotesProvider>
        </CotacoesProvider>
      </UserProvider>
    </div>
  );
}

export default App;
