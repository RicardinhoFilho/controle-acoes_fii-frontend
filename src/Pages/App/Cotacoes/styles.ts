import styled from "styled-components";
import theme from "../../../Styles/theme";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  width: 100%;
`;

export const Table = styled.table``;

export const Tbody = styled.tbody``;

export const TableSection = styled.div`
  margin: auto;
  width: 100%;
  display: block;
  overflow-x/*(eixo x)*/: auto; /*Agora quando necessário a rolagem da tabela é permitida(funcionamento para o mobile)*/

  margin-bottom: 10px;
  overflow-y: scroll;
  height: 80vh;
  &::-webkit-scrollbar {
    width: 0.6vw;
    height: 0.6vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary}; /* color of the scroll thumb */
    border-radius: 0.25rem; /* roundness of the scroll thumb */
    height: 2px;
  }
`;

export const SpanTitle = styled.span`
  color: ${theme.colors.primary};
  font-size:max(1vw, 10px);
`;

export const SpanDescricao = styled.span`
  color: ${theme.colors.lightgrey};
  font-size:max(0.8vw, 8px);
`;


export const Title = styled.h1`

  font-size:max(2vw, 18px);

`;


export const Tr = styled.tr`

  cursor:pointer;
  &:hover{
    background-color: ${theme.colors.light};
    opacity: 0.7;
  }


`;