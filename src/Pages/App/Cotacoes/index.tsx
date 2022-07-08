import React, { useEffect, useState } from "react";
import { MenuLateral } from "../../../Components/MenuLateral";
import { IEmpresa, useCotacoes } from "../../../Hooks/cotacoes";
import {
  Container,
  MainContainer,
  Table,
  Tbody,
  TableSection,
  SpanTitle,
  SpanDescricao,
  Title,
  Tr,
} from "./styles";
import { Plus, BarChart } from "react-feather";
import { NovaEmpresaForm } from "../../../Components/Forms/NovaEmpresaForm";
import api from "../../../Services/api";
import { CotacoesTd } from "./Cotacoes";

export function Cotacoes() {
  const { empresas, getEmpesas } = useCotacoes();
  const [openModal, setOpenModal] = useState(false);
  const [empresaFocus, setEmpresFocus] = useState({} as IEmpresa);

  useEffect(() => {
    getEmpesas();
  }, []);

  function RenderEmpresas() {
    if (empresas) {
      if (empresas.length > 0) {
        return empresas.map((item) => {
          return (
            <Tr onClick={() => setEmpresFocus(item)}>
              <th scope="row">{item.ID}</th>
              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SpanTitle>{item.NOME} </SpanTitle>
                <SpanDescricao>
                  {item.SEGMENTO}: {item.DESCRICAO}
                </SpanDescricao>
              </td>
              <td>{item.SIGLA}</td>
              <CotacoesTd sigla={item.SIGLA} />
            </Tr>
          );
        });
      }
    }

    return <div></div>;
  }
  return (
    <MainContainer>
      <MenuLateral />
      <Container>
        <Title>Cotações</Title>
        <TableSection>
          <Table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Empresa</th>
                <th scope="col">Sigla</th>
                <th scope="col">Cotação do Dia</th>
                <th scope="col">Variação do Dia</th>
              </tr>
            </thead>
            <Tbody>{RenderEmpresas()}</Tbody>
          </Table>
        </TableSection>

        <button onClick={() => setOpenModal(true)}>
          <Plus />
          <BarChart />
        </button>
      </Container>
      <NovaEmpresaForm
        open={openModal || empresaFocus.ID != undefined}
        onClose={() => {
          setOpenModal(false);
          setEmpresFocus({} as IEmpresa);
        }}
        empresaFocus={empresaFocus}
      />
    </MainContainer>
  );
}
