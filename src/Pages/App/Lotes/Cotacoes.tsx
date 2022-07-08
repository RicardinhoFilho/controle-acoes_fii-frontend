import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import theme from "../../../Styles/theme";

interface Props {
  sigla: string;
  valor_de_compra: number;
  quantidade: number;
}

export function CotacoesTd({ sigla, valor_de_compra, quantidade }: Props) {
  const [item, setItem] = useState({} as { cotacao: 0; variacao: "-" });
  const [atencao, setAtencao] = useState(true);

  async function handleGetData() {
    try {
      const { data } = await api.get(`/cotacoes/${sigla}`);
      setItem(data);
    } catch (error) {}
  }


  useEffect(() => {
    if(item){
        if(item.cotacao){
            if( item.cotacao * quantidade - valor_de_compra * quantidade > 0){
                setAtencao(false)
            }
        }
    }
  },[item])


  useEffect(() => {
    handleGetData();
  }, []);



  return (
    <>
      <td>
        {Number(item.cotacao).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </td>

      <td style={{color:atencao? theme.colors.attention : theme.colors.success}} >{Number((item.cotacao / valor_de_compra) * 100 - 100).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }).replaceAll("R$","")}%</td>

      <td>
        {Number(
          item.cotacao * quantidade - valor_de_compra * quantidade
        ).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        
      </td>
    </>
  );
}
