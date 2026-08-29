import { useState } from 'react';

const api = 'http://localhost:3001';

function formatarData(data) {
  return new Date(`${data.slice(0, 10)}T00:00:00`).toLocaleDateString('pt-BR');
}

export default function DetalhesEvento({ evento, voltar, editar, eventoExcluido }) {
  const [mensagemErro, setMensagemErro] = useState('');

  async function excluirEvento() {
    const confirmarExclusao = window.confirm('deseja excluir este evento?');

    if (!confirmarExclusao) return;

    setMensagemErro('');

    try {
      const resposta = await fetch(`${api}/eventos/${evento.id}`, {
        method: 'DELETE'
      });

      const dadosResposta = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dadosResposta.erro);
      }

      eventoExcluido('evento excluído com sucesso');
    } catch (erro) {
      setMensagemErro(erro.message || 'nao foi possivel excluir o evento');
    }
  }

  return (
    <section className="detalhe">
      <div className="detalhe-topo">
        <button onClick={voltar}>voltar</button>

        <div className="acoes">
          <button className="botao" onClick={editar}>editar</button>
          <button className="link-perigo" onClick={excluirEvento}>excluir</button>
        </div>
      </div>

      <span className="tag">{evento.modalidade}</span>
      {mensagemErro && <p className="mensagem erro">{mensagemErro}</p>}
      <h1>{evento.nome}</h1>
      <p>{evento.descricao}</p>

      <dl>
        <div><dt>data</dt><dd>{formatarData(evento.data_evento)}</dd></div>
        <div><dt>local</dt><dd>{evento.local_evento}</dd></div>
        <div><dt>cidade</dt><dd>{evento.cidade}</dd></div>
        <div><dt>capacidade</dt><dd>{evento.capacidade} atletas</dd></div>
        <div><dt>status</dt><dd>{evento.status_evento}</dd></div>
      </dl>
    </section>
  );
}
