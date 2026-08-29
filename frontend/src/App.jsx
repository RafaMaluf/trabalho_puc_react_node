import { useState } from 'react';
import ListaEventos from './ListaEventos.jsx';
import FormularioEvento from './FormularioEvento.jsx';
import DetalhesEvento from './DetalhesEvento.jsx';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('lista');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [atualizarListagem, setAtualizarListagem] = useState(0);

  function abrirNovoEvento() {
    setEventoSelecionado(null);
    setMensagem('');
    setTelaAtual('formulario');
  }

  function abrirDetalhes(evento) {
    setEventoSelecionado(evento);
    setMensagem('');
    setTelaAtual('detalhes');
  }

  function abrirEdicao() {
    setTelaAtual('formulario');
  }

  function voltarParaLista(novaMensagem = '') {
    setEventoSelecionado(null);
    setMensagem(novaMensagem);
    setAtualizarListagem(atualizarListagem + 1);
    setTelaAtual('lista');
  }

  let conteudo;

  if (telaAtual === 'formulario') {
    conteudo = (
      <FormularioEvento
        evento={eventoSelecionado}
        cancelar={() => voltarParaLista()}
        salvarComSucesso={voltarParaLista}
      />
    );
  } else if (telaAtual === 'detalhes' && eventoSelecionado) {
    conteudo = (
      <DetalhesEvento
        evento={eventoSelecionado}
        voltar={() => voltarParaLista()}
        editar={abrirEdicao}
        eventoExcluido={voltarParaLista}
      />
    );
  } else {
    conteudo = (
      <ListaEventos
        abrirFormulario={abrirNovoEvento}
        abrirDetalhes={abrirDetalhes}
        mensagem={mensagem}
        atualizarListagem={atualizarListagem}
      />
    );
  }

  return (
    <div className="app">
      <header>
        <button className="logo" onClick={() => setTela('lista')}>
          agenda esportiva
        </button>
        <span>aluno: rafael calixto maluf</span>
      </header>

      <main>{conteudo}</main>
    </div>
  );
}
