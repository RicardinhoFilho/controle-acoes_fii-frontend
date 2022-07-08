import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { IEmpresa, useCotacoes } from "../../../Hooks/cotacoes";
import { ILote, useLotes } from "../../../Hooks/lotes";
import { useUser } from "../../../Hooks/user";
import api from "../../../Services/api";
import theme from "../../../Styles/theme";
import { Container, Tr } from "./styles";

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
  loteFocus: ILote;
}
export function NovoLoteModal({ open, onClose, loteFocus }: Props) {
  const [empresa, setEmpresa] = useState({} as IEmpresa);
  const [valor, setValor] = useState({} as any);
  const [quantidade, setQuantidade] = useState({} as any);
  const { getLotes, lotes } = useLotes();
  const { user } = useUser();
  const { empresas, getEmpesas } = useCotacoes();
  const [modalEmpresas, setModalEmpresas] = useState(false);

  useEffect(() => {
    getEmpesas();
  }, []);

  useEffect(() => {
    if (loteFocus.id) {
      setValor(loteFocus.VALOR_UNIDADE);
      setQuantidade(loteFocus.quantidade);
      setEmpresa({
        DESCRICAO: "",
        FII: false,
        NOME: "",
        ID: loteFocus.empresa_id,
        SEGMENTO: "",
        SEGMENTO_ID: 0,
        SIGLA: loteFocus.sigla,
      });
    }
  }, [loteFocus]);

  function renderModalEmpresas(open: boolean, onClose: () => void) {
    return (
      <>
        <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
          <Container>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Sigla</th>
                  <th scope="col">Empresa</th>
                </tr>
              </thead>
              <tbody>{renderEmpresas()}</tbody>
            </table>
          </Container>
        </Modal>
      </>
    );
  }

  function renderEmpresas() {
    if (empresas) {
      if (empresas.length > 0) {
        return empresas.map((item) => {
          return (
            <Tr
              onClick={() => {
                setEmpresa(item);
                setModalEmpresas(false);
              }}
            >
              <th scope="row">{item.ID}</th>
              <td>{item.SIGLA}</td>
              <td>{item.NOME}</td>
            </Tr>
          );
        });
      }
    }
  }

  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <Container>
        <form>
          <div className="form-group">
            <label htmlFor="segmento">Empresa</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              aria-describedby="emailHelp"
              placeholder="Empresa"
              value={empresa.SIGLA}
              onChange={(ev) => {}}
              onClick={() => setModalEmpresas(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Valor Unitário</label>
            <input
              type="number"
              className="form-control"
              id="descricao"
              aria-describedby="emailHelp"
              placeholder="Valor Unidade"
              value={valor}
              onChange={(ev) => {
                setValor(ev.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              className="form-control"
              id="quantidade"
              aria-describedby="emailHelp"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(ev) => {
                ev.target.value.replace(",", "");
                setQuantidade(Number(ev.target.value));
              }}
            />
          </div>
          <div style={{display:"flex", justifyContent:"space-between", width:'100%'}}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={async (event) => {
              event.preventDefault();
              try {
                if (loteFocus.id) {
                  await api.patch(`/lote`, {
                    id:loteFocus.id,
                    usuario_id: user.id,

                    quantidade,
                    valor_unidade: valor.replaceAll(",", "."),
                    empresa_id: empresa.ID,
                  });
                } else {
                  await api.post(`/lote`, {
                    usuario_id: user.id,

                    quantidade,
                    valor_unidade: valor.replaceAll(",", "."),
                    empresa_id: empresa.ID,
                  });
                }
                setValor(0);
                setQuantidade(0);
                setEmpresa({} as IEmpresa);
                onClose();
                getLotes();
              } catch (error) {}
            }}
          >
            Salvar
          </button>

          <button
            type="submit"
            className="btn btn-danger"
            onClick={async (event) => {
              try{
                event.preventDefault();
                setValor(0);
                setQuantidade(0);
                setEmpresa({} as IEmpresa);

                await api.delete(`/lote/${loteFocus.id}`)
                onClose();
                getLotes();
              }catch (error) {

              }
             

            }}
            hidden={!loteFocus.id}
            
            >
            
            Excluir
            </button>
            </div>
        </form>
      </Container>
      {renderModalEmpresas(modalEmpresas, () => {
        setModalEmpresas(false);
      })}
    </Modal>
  );
}
