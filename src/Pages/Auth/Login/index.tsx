import React, { useState } from "react";
import { LoginInputs } from "../../../Components/Input/LoginInputs";
import { useUser } from "../../../Hooks/user";
import api from "../../../Services/api";
import { Container, ContainerInputs,Title,Span, LoginButton} from "./styles";

export function Login(){
    const{signIn} = useUser();
    const[login, setLogin] = useState("");
    const[senha, setSenha] = useState("");
    const[error, setError] = useState({title:"", message: ""})

    return <Container>

    <ContainerInputs>
       <Title>Acessar o sistema</Title>
       <Span>Acesse com seu email e senha abaixo!</Span>

       <LoginInputs type="Login" execute={(str:string)=>{setLogin(str)}}/>

       <LoginInputs type="Senha"  execute={(str:string)=>{setSenha(str)}}/>


       <LoginButton onClick={async(ev)=>{
        ev.preventDefault();
        try {
            await signIn(login, senha)
        } catch (error) {
            setError({message: "Não foi possível efetuar seu login!", title: "Ops" })
        }
    
      
       }}>Acessar</LoginButton>
    </ContainerInputs>

    </Container>


}
