import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import theme from "../../../Styles/theme";

interface Props {
  sigla: string;
}

export function CotacoesTd({ sigla }: Props) {
  const [item, setItem] = useState({} as { cotacao: 0; variacao: "-" });
  const [attention, setAttention] = useState(false);

  async function handleGetData() {
    try {
      const { data } = await api.get(`/cotacoes/${sigla}`);
      setItem(data);
    } catch (error) {}
  }

  useEffect(() => {
    if (item.variacao)
      if (item.variacao.indexOf("+") == -1) {
        setAttention(true);
      }
  }, [item]);
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
      <td
        style={{
          color: attention ? theme.colors.attention : theme.colors.success,
        }}
      >
        {item.variacao}
      </td>
    </>
  );
}
