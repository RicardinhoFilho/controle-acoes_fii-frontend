import React from "react";
import { Label,Input } from "./styles";


interface Props{
    type:'Login'|'Senha';
    execute(str:string):void;
}
export function LoginInputs({type,execute}:Props){


    return<Label>
    {type}
        <Input placeholder={type} type={type=="Senha"? "password" : "text"} onChange={(ev)=>{execute(ev.target.value)}}/>
    </Label>


}