import React from "react";
import { useUser } from "../Hooks/user";
import { AuthRoutes } from "./Auth.routes";
import { AppRoutes } from "./App.routes";

export function Routes() {
  const{userLogged} = useUser();

  return userLogged? <AppRoutes/>   :<AuthRoutes/>;
}
