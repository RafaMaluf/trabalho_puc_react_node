import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;
const banco = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());

function validarEvento(evento) {
  if (!evento.nome) return 'informe o nome do evento';
  if (!evento.modalidade) return 'informe a modalidade';
  if (!evento.data_evento) return 'informe a data do evento';
  if (!evento.local_evento) return 'informe o local do evento';
  if (!evento.cidade) return 'informe a cidade';
  if (!evento.capacidade) return 'informe a capacidade';
  if (!evento.status_evento) return 'informe o status do evento';
  if (!evento.descricao) return 'informe a descricao';

  const capacidade = Number(evento.capacidade);
  if (!Number.isInteger(capacidade) || capacidade < 1) {
    return 'a capacidade deve ser um numero inteiro maior que zero';
  }

  const statusPermitidos = ['planejado', 'inscricoes abertas', 'encerrado'];
  if (!statusPermitidos.includes(evento.status_evento)) {
    return 'status do evento invalido';
  }

  return null;
}

app.get('/eventos', async (req, res) => {
  const paginaAtual = Number(req.query.pagina) || 1;
  const limite = 3;
  const deslocamento = (paginaAtual - 1) * limite;

  try {
    const [listaEventos] = await banco.query(
      'SELECT * FROM eventos_esportivos ORDER BY atualizado_em DESC, id DESC LIMIT ? OFFSET ?',
      [limite, deslocamento]
    );

    const [resultadoTotal] = await banco.query(
      'SELECT COUNT(*) AS total FROM eventos_esportivos'
    );

    const totalEventos = resultadoTotal[0].total;
    const totalPaginas = Math.ceil(totalEventos / limite);

    res.json({
      eventos: listaEventos,
      pagina_atual: paginaAtual,
      total_paginas: totalPaginas,
      total_eventos: totalEventos
    });
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao buscar eventos' });
  }
});

app.get('/eventos/:id', async (req, res) => {
  try {
    const [listaEventos] = await banco.query(
      'SELECT * FROM eventos_esportivos WHERE id = ?',
      [req.params.id]
    );

    const eventoEncontrado = listaEventos[0];
    if (!eventoEncontrado) return res.status(404).json({ erro: 'evento nao encontrado' });

    res.json(eventoEncontrado);
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao buscar evento' });
  }
});

app.post('/eventos', async (req, res) => {
  const erro = validarEvento(req.body);
  if (erro) return res.status(400).json({ erro });

  const { nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao } = req.body;

  try {
    const [resultadoInsercao] = await banco.query(
      'INSERT INTO eventos_esportivos (nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao]
    );

    res.status(201).json({ id: resultadoInsercao.insertId });
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao criar evento' });
  }
});

app.put('/eventos/:id', async (req, res) => {
  const erro = validarEvento(req.body);
  if (erro) return res.status(400).json({ erro });

  const { nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao } = req.body;

  try {
    const [resultadoAtualizacao] = await banco.query(
      'UPDATE eventos_esportivos SET nome = ?, modalidade = ?, data_evento = ?, local_evento = ?, cidade = ?, capacidade = ?, status_evento = ?, descricao = ? WHERE id = ?',
      [nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao, req.params.id]
    );

    if (!resultadoAtualizacao.affectedRows) return res.status(404).json({ erro: 'evento nao encontrado' });

    res.json({ mensagem: 'evento atualizado' });
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao atualizar evento' });
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    const [resultadoExclusao] = await banco.query(
      'DELETE FROM eventos_esportivos WHERE id = ?',
      [req.params.id]
    );

    if (!resultadoExclusao.affectedRows) return res.status(404).json({ erro: 'evento nao encontrado' });

    res.json({ mensagem: 'evento excluido' });
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao excluir evento' });
  }
});

app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'os dados enviados nao estao no formato correto' });
  }

  next(erro);
});

app.listen(port, () => console.log(`api rodando em http://localhost:${port}`));
