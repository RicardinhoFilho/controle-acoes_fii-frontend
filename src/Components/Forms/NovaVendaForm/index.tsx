import React, { useEffect, useState } from "react";
import theme from "../../../Styles/theme";
import Modal from "react-modal";
import { IVenda, useVendas } from "../../../Hooks/vendas";
import { Container } from "./styles";
import { ILote, useLotes } from "../../../Hooks/lotes";
import api from "../../../Services/api";
import { Tr } from "../NovoLote/styles";
import { useUser } from "../../../Hooks/user";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.colors.secondary,
    minWidth: "40%",
    maxWidth: "80%",
    borderRadius: "0.25rem",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  vendaFocus: IVenda;
}

export function NovaVendaForm({ open, onClose, vendaFocus }: Props) {
  const [lote, setLote] = useState({} as ILote);
  const [quantidade, setQuantidade] = useState(0);
  const [valorUnidade, setValorUnidade] = useState({} as any);
  const [openModalLotes, setOpenModalLotes] = useState(false);

  const { vendas, getVendas } = useVendas();
  const { lotes, getLotes } = useLotes();

  useEffect(() => {
    if (vendaFocus) {
      setQuantidade(vendaFocus.quantidade);
      setValorUnidade(vendaFocus.compra_valor_unidade);
      setLote({
        empresa_id: 0,
        id: vendaFocus.lote_id,
        quantidade: vendaFocus.quantidade_disponivel,
        sigla: vendaFocus.sigla,
        VALOR_UNIDADE: 0,
      });
    }
  }, [vendaFocus]);

  function renderLotes() {
    if (lotes) {
      if (lotes.length > 0) {
        return lotes.map((item) => {
          return (
            <Tr
              onClick={() => {
                setLote(item);
                setOpenModalLotes(false);
              }}
            >
              <th scope="row"></th>
              <th>{item.id}</th>
              <td>{item.sigla}</td>
              <td>{parseInt(`${item.quantidade}`)}</td>
            </Tr>
          );
        });
      }
    }
  }

  function renderModalLotes(open: boolean, onClose: () => void) {
    return (
      <>
        <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
          <Container>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Lote</th>
                  <th scope="col">Sigla</th>
                  <th scope="col">Quantidade Disponível</th>
                </tr>
              </thead>
              <tbody>{renderLotes()}</tbody>
            </table>
          </Container>
        </Modal>
      </>
    );
  }

  useEffect(() => {
    if (!lotes.length) {
      getLotes();
    }
  }, [lotes]);
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <Container>
        <form>
          <div className="form-group">
            <label htmlFor="Lote">Lote</label>
            <input
              type="text"
              className="form-control"
              id="Lote"
              aria-describedby="emailHelp"
              placeholder="Lote"
              value={lote.id + "-" + lote.sigla}
              onClick={(ev) => {
                setOpenModalLotes(true);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Quantidade">Quantidade</label>
            <input
              type="number"
              className="form-control"
              id="Quantidade"
              aria-describedby="emailHelp"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(ev) => {
                setQuantidade((prev) =>
                  Number(ev.target.value) > lote.quantidade
                    ? prev
                    : Number(ev.target.value)
                );
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Valor">Valor</label>
            <input
              type="number"
              className="form-control"
              id="Valor"
              aria-describedby="emailHelp"
              placeholder="Valor"
              value={valorUnidade}
              onChange={(ev) => {
                setValorUnidade(ev.target.value);
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  if (vendaFocus.id) {
                    await api.patch(`/venda`, {
                      id: vendaFocus.id,
                      lote_id: lote.id,
                      quantidade,
                      valor_unidade: valorUnidade.replaceAll(",", "."),
                    });
                  } else {
                    await api.post(`/venda`, {
                      lote_id: lote.id,

                      quantidade,
                      valor_unidade: valorUnidade.replaceAll(",", "."),
                    });
                  }
                  setQuantidade(0);
                  setValorUnidade(0);
                  setLote({} as ILote);

                  onClose();
                  getVendas();
                } catch (error) {}
              }}
            >
              Salvar
            </button>

            <button
              type="submit"
              className="btn btn-danger"
              onClick={async (event) => {
                try {
                  event.preventDefault();
                  setQuantidade(0);
                  setValorUnidade(0);
                  setLote({} as ILote);

                  await api.delete(`/venda/${vendaFocus.id}`);
                  onClose();
                  getVendas();
                } catch (error) {}
              }}
              hidden={!vendaFocus.id}
            >
              Excluir
            </button>
          </div>
        </form>

        {renderModalLotes(openModalLotes, () => {
          setOpenModalLotes(false);
        })}
      </Container>
    </Modal>
  );
}
