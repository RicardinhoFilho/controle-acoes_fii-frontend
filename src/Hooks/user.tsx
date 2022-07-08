import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";
import { userLocalStorage } from "../Utils/localStorageKeys";

export interface IUser {
  id: number;
  nome: string;
  email: string;
  senha: string;
  token: string;
}

interface IUserContextData {
  signIn(email: string, senha: string): Promise<void>;
  userLogged:boolean;
  user:IUser;
}

interface IUserProviderProps {
  children: ReactNode;
}

const UserContext = createContext({} as IUserContextData);

function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState({} as IUser);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    let dados =(localStorage.getItem(userLocalStorage));
    if(dados != null){
      
      signIn(JSON.parse(dados).email,JSON.parse(dados).senha)
    }

  },[]);


  async function signIn(email: string, senha: string) {
    try {
      const { data } = await api.post(`/usuario/signIn`, { email, senha });
      
      setUser(data);

      localStorage.setItem(userLocalStorage, JSON.stringify({email:email, senha:senha}));
     
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUserLogged(true);
    } catch (error) {
      throw error;
    }
  }
  return (
    <UserContext.Provider value={{ signIn, userLogged,user }}>{children}</UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, useUser };
