import { useState } from 'react';

const api = 'http://localhost:3001';

const eventoVazio = {
  nome: '',
  modalidade: '',
  data_evento: '',
  local_evento: '',
  cidade: '',
  capacidade: '',
  status_evento: 'planejado',
  descricao: ''
};

export default function FormularioEvento({ evento, cancelar, salvarComSucesso }) {
  const eventoInicial = evento
    ? { ...evento, data_evento: evento.data_evento.slice(0, 10) }
    : eventoVazio;

  const [dadosFormulario, setDadosFormulario] = useState(eventoInicial);
  const [mensagemErro, setMensagemErro] = useState('');
  const editandoEvento = Boolean(evento);

  function alterarCampo(eventoInput) {
    const nomeCampo = eventoInput.target.name;
    const valorCampo = eventoInput.target.value;

    setDadosFormulario({
      ...dadosFormulario,
      [nomeCampo]: valorCampo
    });
  }

  async function salvarEvento(eventoFormulario) {
    eventoFormulario.preventDefault();
    setMensagemErro('');

    const endereco = editandoEvento
      ? `${api}/eventos/${evento.id}`
      : `${api}/eventos`;

    const metodo = editandoEvento ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(endereco, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormulario)
      });

      const dadosResposta = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dadosResposta.erro);
      }

      const mensagem = editandoEvento
        ? 'evento atualizado com sucesso'
        : 'evento criado com sucesso';

      salvarComSucesso(mensagem);
    } catch (erro) {
      setMensagemErro(erro.message || 'nao foi possivel salvar o evento');
    }
  }

  return (
    <section className="formulario">
      <h1>{editandoEvento ? 'editar evento' : 'novo evento'}</h1>
      {mensagemErro && <p className="mensagem erro">{mensagemErro}</p>}

      <form onSubmit={salvarEvento}>
        <label>
          nome
          <input name="nome" value={dadosFormulario.nome} onChange={alterarCampo} required />
        </label>

        <label>
          modalidade
          <input name="modalidade" value={dadosFormulario.modalidade} onChange={alterarCampo} required />
        </label>

        <label>
          data
          <input type="date" name="data_evento" value={dadosFormulario.data_evento} onChange={alterarCampo} required />
        </label>

        <label>
          local
          <input name="local_evento" value={dadosFormulario.local_evento} onChange={alterarCampo} required />
        </label>

        <label>
          cidade
          <input name="cidade" value={dadosFormulario.cidade} onChange={alterarCampo} required />
        </label>

        <label>
          capacidade
          <input type="number" min="1" name="capacidade" value={dadosFormulario.capacidade} onChange={alterarCampo} required />
        </label>

        <label>
          status
          <select name="status_evento" value={dadosFormulario.status_evento} onChange={alterarCampo}>
            <option value="planejado">planejado</option>
            <option value="inscricoes abertas">inscrições abertas</option>
            <option value="encerrado">encerrado</option>
          </select>
        </label>

        <label className="linha-inteira">
          descrição
          <textarea name="descricao" value={dadosFormulario.descricao} onChange={alterarCampo} required />
        </label>

        <div className="acoes-formulario">
          <button type="button" onClick={cancelar}>cancelar</button>
          <button className="botao" type="submit">salvar</button>
        </div>
      </form>
    </section>
  );
}
