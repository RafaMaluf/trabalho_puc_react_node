CREATE DATABASE IF NOT EXISTS agenda_esportiva;
USE agenda_esportiva;

CREATE TABLE IF NOT EXISTS eventos_esportivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  modalidade VARCHAR(80) NOT NULL,
  data_evento DATE NOT NULL,
  local_evento VARCHAR(150) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  capacidade INT NOT NULL,
  status_evento ENUM('planejado', 'inscricoes abertas', 'encerrado') NOT NULL DEFAULT 'planejado',
  descricao TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO eventos_esportivos
  (nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao)
SELECT 'Corrida Parque Barigui', 'corrida', '2026-05-18', 'Parque Barigui', 'Curitiba', 800, 'inscricoes abertas', 'Corrida de 5 km e 10 km para atletas amadores.'
WHERE NOT EXISTS (SELECT 1 FROM eventos_esportivos WHERE nome = 'Corrida Parque Barigui');

INSERT INTO eventos_esportivos
  (nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao)
SELECT 'Copa Universitaria de Futsal', 'futsal', '2026-06-02', 'Ginasio da Universidade', 'Curitiba', 250, 'planejado', 'Torneio entre equipes universitarias.'
WHERE NOT EXISTS (SELECT 1 FROM eventos_esportivos WHERE nome = 'Copa Universitaria de Futsal');

INSERT INTO eventos_esportivos
  (nome, modalidade, data_evento, local_evento, cidade, capacidade, status_evento, descricao)
SELECT 'Desafio de Volei de Praia', 'volei', '2026-07-12', 'Arena da Praia', 'Matinhos', 120, 'inscricoes abertas', 'Competicao em duplas com fase classificatoria e final.'
WHERE NOT EXISTS (SELECT 1 FROM eventos_esportivos WHERE nome = 'Desafio de Volei de Praia');
