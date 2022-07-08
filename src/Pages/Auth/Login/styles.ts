import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`

    display: flex;
    align-items: center;
    justify-content:center;
    background-color: ${theme.colors.primary};
    width: 100%;
    height:100vh;


`;



export const ContainerInputs = styled.form`
    width: max(25vw, 300px);
    height:90vh;
    background-color: ${theme.colors.light};

    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;

    padding-right:1vw;
    padding-left:1vw;

`;

export const Title = styled.h1`

width:100%;
text-align:center;
color: ${theme.colors.primary};
font-size: max(1.5vw, 13px);
font-weight:bold ;
margin-bottom:1vh;

`;

export const Span = styled.span`

color: ${theme.colors.lightgrey};
font-size: max(1vw, 8px);
margin-bottom:4vh;

`;





export const LoginButton = styled.button`

    background-color: ${theme.colors.confirm};
    font-size: max(1vw, 8px);
    padding:  0.8vh;
    color: ${theme.colors.light};
    width: 100%;
    border-radius: 0.25rem;
    padding: 0.5vw;
    margin-top:4vh;

`;