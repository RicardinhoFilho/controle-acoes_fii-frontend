import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import api from "../Services/api";
  import { userLocalStorage } from "../Utils/localStorageKeys";
  
  export interface IVenda{
    id:number;
    lote_id:number;
    quantidade: number;
    venda_valor_unidade: number;
    compra_valor_unidade:number;
    nome_empresa:string;
    sigla:string;
    quantidade_disponivel:number;

  }
  
  interface IVendasContextData {
    vendas:IVenda[];
    getVendas():Promise<void>;
  }
  
  interface IVendasProviderProps {
    children: ReactNode;
  }
  
  const VendasContext = createContext({} as IVendasContextData);
  
  function VendasProvider({ children }: IVendasProviderProps) {
   
    const [vendas, setVendas] = useState({} as IVenda[]);

    async function getVendas(){
        try {
            const {data} = await api.get(`/venda`);
            setVendas(data);
        } catch (error) {
            throw error;
        }
    }


 
  
    return (
      <VendasContext.Provider value={{ vendas,getVendas }}>{children}</VendasContext.Provider>
    );
  }
  
  function useVendas() {
    const context = useContext(VendasContext);
  
    return context;
  }
  
  export { VendasProvider, useVendas };
  