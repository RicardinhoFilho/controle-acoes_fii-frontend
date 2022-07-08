import React, { useEffect, useState } from "react";
import { MenuLateral } from "../../../Components/MenuLateral";
import { IVenda, useVendas } from "../../../Hooks/vendas";
import {
  Container,
  MainContainer,
  Table,
  TableSection,
  Title,
  Tr,
} from "./styles";
import { DollarSign, Plus } from "react-feather";
import { NovaVendaForm } from "../../../Components/Forms/NovaVendaForm";
export function Vendas() {
  const { vendas, getVendas } = useVendas();
  const [vendaFocus, setVendaFocus] = useState({} as IVenda);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getVendas();
  }, []);

  function renderVenda() {
    if (vendas) {
      if (vendas.length > 0) {
        return vendas.map((item) => {
          return (
            <Tr
              onClick={() => {
                setVendaFocus(item);
              }}
            >
              <th scope="row">{item.id}</th>

              <td>{item.nome_empresa}</td>
              <td>{item.sigla}</td>
              <td>{item.lote_id}</td>
              <td>
                {Number(item.compra_valor_unidade).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>
                {Number(item.venda_valor_unidade).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td>{item.quantidade}</td>

              <td>
                {(
                  item.quantidade * item.venda_valor_unidade -
                  item.quantidade * item.compra_valor_unidade
                ).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td>
                {(
                  ((item.quantidade * item.venda_valor_unidade) /
                    (item.quantidade * item.compra_valor_unidade)) *
                    100 -
                  100
                )
                  .toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace("R$", "")}
                %
              </td>
            </Tr>
          );
        });
      }
    }
  }

  return (
    <Container>
      <MenuLateral />
      <MainContainer>
        <Title>Vendas</Title>
        <TableSection>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Empresa</th>
                <th scope="col">Sigla</th>
                <th scope="col">Lote</th>
                <th scope="col">Compra</th>
                <th scope="col">Venda</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Lucro</th>
                <th scope="col">Porcentagem</th>
              </tr>
            </thead>
            <tbody>{renderVenda()}</tbody>
          </Table>
        </TableSection>
        <button onClick={() => setOpenModal(true)}>
          <Plus />
          <DollarSign />
        </button>

        <NovaVendaForm
          open={vendaFocus.id != undefined || openModal}
          onClose={() => {
            setVendaFocus({} as IVenda);

            setOpenModal(false);
          }}
          vendaFocus={vendaFocus}
        />
      </MainContainer>
    </Container>
  );
}
