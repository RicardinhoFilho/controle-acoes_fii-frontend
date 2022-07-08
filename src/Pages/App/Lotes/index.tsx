import React, { useEffect, useState } from "react";
import { MenuLateral } from "../../../Components/MenuLateral";
import { ILote, useLotes } from "../../../Hooks/lotes";
import { CotacoesTd } from "./Cotacoes";
import {Layout, Plus} from "react-feather";
import {
  MainContainer,
  Container,
  TableSection,
  Table,
  Tbody,
  Title,
  Tr,
} from "./styles";
import { NovoLoteModal } from "../../../Components/Forms/NovoLote";
export function Lotes() {
  const { getLotes, lotes } = useLotes();
  const[openModal, setOpenModal] = useState(false);
  const[loteFocus, setLoteFocus] = useState({} as ILote);


  useEffect(() => {
    getLotes();
  }, []);

 

  function RenderLotes() {
    console.log(lotes);
    if (lotes) {
      if (lotes.length > 0) {
        return lotes.map((item) => {
          return (
            <Tr onClick={() => {setLoteFocus(item)}}>
              <th scope="row">{item.id}</th>

              <td>{item.sigla}</td>
              <td>{item.quantidade}</td>
              <td>
                {Number(item.VALOR_UNIDADE).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <CotacoesTd sigla={item.sigla}  valor_de_compra={item.VALOR_UNIDADE} quantidade={item.quantidade}/>
            </Tr>
          );
        });
      }
    }

    return <div></div>;
  }

  return (
    <Container>
      <MenuLateral />{" "}
      <MainContainer>
        <Title>LOTES</Title>

        <TableSection>
          <Table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">SIGLA</th>
                <th scope="col">QUANTIDADE</th>
                <th scope="col">VALOR DE COMPRA</th>
                <th scope="col">VALOR DE MERCADO</th>
                <th scope="col">Diferença em %</th>
                <th scope="col">Diferença em R$</th>
              </tr>
            </thead>
            <Tbody>{RenderLotes()}</Tbody>
          </Table>
        </TableSection>

        <button onClick={() => setOpenModal(true)}>
          <Plus />
          <Layout />
        </button>
      </MainContainer>

    <NovoLoteModal loteFocus={loteFocus} open={(openModal || loteFocus.id != undefined)} onClose={()=>{
        setLoteFocus({} as ILote);
        setOpenModal(false);
    }} />

    </Container>
  );
}
