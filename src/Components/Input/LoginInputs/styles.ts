import styled from "styled-components";
import theme from "../../../Styles/theme";



export const Label = styled.label`
display: flex;
align-items: flex-start;
flex-direction: column;

width:100%;

    color: ${theme.colors.lightgrey};

`;

export const Input = styled.input`
width:100%;
padding: 1vh 2vw;
background-color: ${theme.colors.light};
border-radius: 0.25rem;
border-width: 0.2px;
border-color: ${theme.colors.lightgrey};
color: ${theme.colors.lightgrey};
font-size:max(1vw, 10px);
`;
