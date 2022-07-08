import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { app_base_url } from "../Utils/basesUrls";
import { Inicio } from "../Pages/App/Inicio";
import { Cotacoes } from "../Pages/App/Cotacoes";
import { Lotes } from "../Pages/App/Lotes";
import { Vendas } from "../Pages/App/Vendas";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={`${app_base_url}`} element={<Inicio />}></Route>
       
      
      <Route path={`${app_base_url}/cotacoes`} element={<Cotacoes />}></Route>
      <Route path={`${app_base_url}/lotes`} element={<Lotes />}></Route>
      <Route path={`${app_base_url}/vendas`} element={<Vendas />}></Route>
      
      
      </Routes>
    </Router>
  );
}
