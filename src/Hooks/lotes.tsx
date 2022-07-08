import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import api from "../Services/api";
  import { userLocalStorage } from "../Utils/localStorageKeys";
  
  export interface ILote {
    id:number;
    quantidade:number;
    VALOR_UNIDADE: number;
    sigla: string;
    empresa_id:number;
  }
  
  interface ILotesContextData {
    lotes:ILote[];
    getLotes():Promise<void>;
  }
  
  interface ILotesProviderProps {
    children: ReactNode;
  }
  
  const LotesContext = createContext({} as ILotesContextData);
  
  function LotesProvider({ children }: ILotesProviderProps) {
   
    const [lotes, setLotes] = useState({} as ILote[]);

    async function getLotes(){
        try {
            const {data} = await api.get(`/lote`);
            setLotes(data);
        } catch (error) {
            throw error;
        }
    }


 
  
    return (
      <LotesContext.Provider value={{ lotes,getLotes }}>{children}</LotesContext.Provider>
    );
  }
  
  function useLotes() {
    const context = useContext(LotesContext);
  
    return context;
  }
  
  export { LotesProvider, useLotes };
  