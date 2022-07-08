import React, { useEffect, useState } from "react";
import theme from "../../../Styles/theme";
import Modal from "react-modal";
import { Container } from "./styles";
import api from "../../../Services/api";
import { Plus } from "react-feather";
import { IEmpresa, useCotacoes } from "../../../Hooks/cotacoes";
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
  empresaFocus: IEmpresa | undefined;
}

interface ICategoria {
  id: number;
  segmento: string;
  descricao: string;
}
export function NovaEmpresaForm({ open, onClose, empresaFocus }: Props) {
  const [openCategoriaModal, setOpenCategoriaModal] = useState(false);
  const [categorias, setCategorias] = useState({} as ICategoria[]);
  const [categoriaFocus, setCategoriaFocus] = useState({} as ICategoria);
  const [addCategoriaModal, setAddCategoriaModal] = useState(false);
  const { getEmpesas } = useCotacoes();
  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");
  const [fii, setFii] = useState(false);

  useEffect(() => {
    if (empresaFocus != undefined)
      if (empresaFocus.ID) {
        setNome(empresaFocus.NOME);

        setSigla(empresaFocus.SIGLA);
        setFii(empresaFocus.FII);
        setCategoriaFocus({
          id: empresaFocus.SEGMENTO_ID,
          segmento: empresaFocus.SEGMENTO,
          descricao: empresaFocus.DESCRICAO,
        });
      }
  }, [empresaFocus]);

  useEffect(() => {
    if (!open) {
      setNome("");

      setSigla("");
      setFii(false);
      setCategoriaFocus({} as ICategoria);
    }
  }, [open]);

  function RenderAddCategoriaModal() {
    const [segmento, setSegmento] = useState("");
    const [descricao, setDescricao] = useState("");
    return (
      <Modal
        isOpen={addCategoriaModal}
        onRequestClose={() => {
          setAddCategoriaModal(false);
        }}
        style={customStyles}
      >
        <form>
          <div className="form-group">
            <label htmlFor="segmento">Segmento</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              aria-describedby="emailHelp"
              placeholder="Segmento"
              value={segmento}
              onChange={(ev) => {
                setSegmento(ev.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              aria-describedby="emailHelp"
              placeholder="Descricao"
              value={descricao}
              onChange={(ev) => {
                setDescricao(ev.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={async (event) => {
              event.preventDefault();
              try {
                await api.post(`segmento`, { segmento, descricao, fii });
                handleGetCategoria();
                setAddCategoriaModal(false);
              } catch (error) {}
            }}
          >
            Salvar
          </button>
        </form>
      </Modal>
    );
  }

  async function handleGetCategoria() {
    try {
      const { data } = await api.get("/segmento");
      setCategorias(data);
    } catch (error) {}
  }
  useEffect(() => {
    handleGetCategoria();
  }, []);

  function renderCategorias() {
    if (categorias) {
      if (categorias.length > 0) {
        return categorias.map((item) => {
          return (
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCategoriaFocus(item);
                setOpenCategoriaModal(false);
              }}
            >
              <th scope="row">{item.id}</th>
              <td>{item.segmento}</td>
              <td>{item.descricao}</td>
            </tr>
          );
        });
      }
    }
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        onClose();
      }}
      style={customStyles}
    >
      <Container>
        <form>
          <div className="form-group">
            <label htmlFor="empresa">Nome da Empresa</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              aria-describedby="emailHelp"
              placeholder="Empresa"
              value={nome}
              onChange={(ev) => {
                setNome(ev.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Sigla">Sigla</label>
            <input
              type="text"
              className="form-control"
              id="Sigla"
              aria-describedby="emailHelp"
              placeholder="Sigla"
              value={sigla}
              onChange={(ev) => {
                setSigla(ev.target.value);
              }}
            />
          </div>

          <div
            className="form-group"
            onClick={() => setOpenCategoriaModal(true)}
          >
            <label htmlFor="Categoria">Categoria</label>
            <input
              type="text"
              className="form-control"
              id="Categoria"
              aria-describedby="emailHelp"
              placeholder="Categoria"
              value={categoriaFocus.segmento + ":" + categoriaFocus.descricao}
            />
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              value={fii ? 1 : 0}
              checked={fii}
              onChange={(ev) => {
                setFii(!fii);
              }}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              FII
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={async (ev) => {
                ev.preventDefault();
                try {
                  if (empresaFocus && empresaFocus.ID) {
                    await api.patch("empresa", {
                      sigla,
                      nome,
                      segmento_id: categoriaFocus.id,
                      fii,
                      id: empresaFocus.ID,
                    });
                    getEmpesas();
                    onClose();
                  } else {
                    await api.post("empresa", {
                      sigla,
                      nome,
                      segmento_id: categoriaFocus.id,
                      fii,
                    });

                    onClose();
                    getEmpesas();
                  }
                } catch (error) {}
              }}
            >
              Salvar
            </button>

            {empresaFocus && empresaFocus.ID ? (
              <button
                className="btn btn-danger"
                onClick={async (event) => {
                  event.preventDefault();
                  try {
                    await api.delete(`empresa/${empresaFocus.ID}`);

                    onClose();
                    getEmpesas();
                  } catch (error) {}
                }}
              >
                Excluir
              </button>
            ) : (
              ""
            )}
          </div>
        </form>

        <Modal
          isOpen={openCategoriaModal}
          onRequestClose={() => {
            setOpenCategoriaModal(false);
          }}
          style={customStyles}
        >
          <div style={{ maxHeight: "50vh" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Descrição</th>
                </tr>
              </thead>
              <tbody>{renderCategorias()}</tbody>
            </table>
            <button
              onClick={() => {
                setAddCategoriaModal(true);
              }}
            >
              <Plus />
            </button>
          </div>
          <RenderAddCategoriaModal />
        </Modal>
      </Container>
    </Modal>
  );
}
