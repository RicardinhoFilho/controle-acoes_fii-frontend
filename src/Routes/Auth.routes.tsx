import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { app_base_url } from "../Utils/basesUrls";
import {Login} from "../Pages/Auth/Login";

export function AuthRoutes() {
  return <Router>
    <Routes>
      <Route
        path={`${app_base_url}/`}
        element={<Login />}
      ></Route>
    </Routes>
  </Router>;
}
