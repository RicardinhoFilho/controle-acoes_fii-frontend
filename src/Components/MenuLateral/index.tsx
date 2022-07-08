import React from "react";
import { Container, Title, Card } from "./styles";
import { BarChart, DollarSign, Layout } from "react-feather";
import { Link } from "react-router-dom";
import { app_base_url } from "../../Utils/basesUrls";
import { useNavigate } from "react-router-dom";
export function MenuLateral() {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>MENU</Title>

      <Card onClick={() => navigate(`${app_base_url}/cotacoes`)}>
        <BarChart /> Cotações
      </Card>

      <Card onClick={() => navigate(`${app_base_url}/lotes`)}>
        <Layout /> Lotes
      </Card>

      <Card onClick={() => navigate(`${app_base_url}/vendas`)}>
        <DollarSign /> Vendas
      </Card>
    </Container>
  );
}
