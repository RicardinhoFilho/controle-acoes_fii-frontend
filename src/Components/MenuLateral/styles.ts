import styled from "styled-components";
import theme from "../../Styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.primary};
  width: 15vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: max(1.5vw, 12px);
  font-weight: bold;
  color: ${theme.colors.lightgrey};
  margin-bottom: 14vh;
`;

export const Card = styled.button`
  color: ${theme.colors.lightgrey};

  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 1vh 2vw;
  font-size: max(1vw, 10px);
  width: 100%;
  &:hover {
    background-color: ${theme.colors.light};
    opacity: 0.7;
  }

  margin-bottom:2vh;
`;
