-- Migration: Create series table and seed initial data
-- Depends on: rivals (02)
--
-- A Series (série) representa um conjunto de jogos contra o mesmo rival
-- (ex: uma série de 3 ou 4 jogos consecutivos). Cada Game pertence a
-- uma Series, e é a Series quem referencia o rival.

CREATE TABLE series (
  id         INTEGER PRIMARY KEY,
  rival_id   INTEGER NOT NULL REFERENCES rivals(id) ON DELETE RESTRICT,
  name       VARCHAR,
  start_date DATE,
  end_date   DATE
);

-- Seed: uma série por rival (id da série espelha o id do rival).
-- start_date / end_date serão ajustados depois que os games existirem
-- (ver migração de games), pois dependem das datas dos jogos.
INSERT INTO series (id, rival_id, name) VALUES
  (1, 1, 'Serie vs Tomateros'),
  (2, 2, 'Serie vs Charros'),
  (3, 3, 'Serie vs Canheros'),
  (4, 4, 'Serie vs Mayos'),
  (5, 5, 'Serie vs Aguilas');
