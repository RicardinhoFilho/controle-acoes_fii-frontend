import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import api from "../Services/api";
  import { userLocalStorage } from "../Utils/localStorageKeys";
  
  export interface IEmpresa {
    ID:number;
    SIGLA:string;
    NOME: string;
    FII: boolean;
    SEGMENTO:string;
    DESCRICAO: string;
    SEGMENTO_ID:number;
  }
  
  interface ICotacoesContextData {
    empresas:IEmpresa[];
    getEmpesas():Promise<void>;
  }
  
  interface ICotacoesProviderProps {
    children: ReactNode;
  }
  
  const CotacoesContext = createContext({} as ICotacoesContextData);
  
  function CotacoesProvider({ children }: ICotacoesProviderProps) {
   
    const [empresas, setEmpresas] = useState({} as IEmpresa[]);

    async function getEmpesas(){
        try {
            const {data} = await api.get(`/empresa`);
            setEmpresas(data);
        } catch (error) {
            throw error;
        }
    }


 
  
    return (
      <CotacoesContext.Provider value={{ empresas,getEmpesas }}>{children}</CotacoesContext.Provider>
    );
  }
  
  function useCotacoes() {
    const context = useContext(CotacoesContext);
  
    return context;
  }
  
  export { CotacoesProvider, useCotacoes };
  