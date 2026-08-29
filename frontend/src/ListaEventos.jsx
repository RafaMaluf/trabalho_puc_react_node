import { useEffect, useState } from 'react';

const api = 'http://localhost:3001';

function formatarData(data) {
  return new Date(`${data.slice(0, 10)}T00:00:00`).toLocaleDateString('pt-BR');
}

export default function ListaEventos({ abrirFormulario, abrirDetalhes, mensagem, atualizarListagem }) {
  const [listaEventos, setListaEventos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState('');

  async function buscarEventos() {
    setCarregando(true);
    setMensagemErro('');

    try {
      const resposta = await fetch(`${api}/eventos?pagina=${paginaAtual}`);
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro);
      }

      setListaEventos(dados.eventos);
      setTotalPaginas(dados.total_paginas || 1);
    } catch (erro) {
      setMensagemErro(erro.message || 'nao foi possivel carregar os eventos');
    }

    setCarregando(false);
  }

  useEffect(() => {
    buscarEventos();
  }, [paginaAtual, atualizarListagem]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [atualizarListagem]);

  return (
    <section>
      <div className="topo-pagina">
        <div>
          <h1>eventos esportivos</h1>
          <p>lista de eventos, torneios e competições.</p>
        </div>

        <button className="botao" onClick={abrirFormulario}>novo evento</button>
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}
      {mensagemErro && <p className="mensagem erro">{mensagemErro}</p>}

      {carregando && <p className="carregando">carregando eventos...</p>}

      {!carregando && !mensagemErro && (
        <>
          <div className="grade">
            {listaEventos.map((evento) => (
              <article className="card" key={evento.id} onClick={() => abrirDetalhes(evento)}>
                <span className="tag">{evento.modalidade}</span>
                <h2>{evento.nome}</h2>
                <p>{formatarData(evento.data_evento)}</p>
                <p>{evento.cidade}</p>
              </article>
            ))}
          </div>

          {listaEventos.length === 0 && <p>nenhum evento cadastrado.</p>}

          <div className="paginacao">
            <button
              onClick={() => setPaginaAtual(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              anterior
            </button>

            <span>pagina {paginaAtual} de {totalPaginas}</span>

            <button
              onClick={() => setPaginaAtual(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              proxima
            </button>
          </div>
        </>
      )}
    </section>
  );
}
