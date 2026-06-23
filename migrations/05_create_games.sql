-- Migration: Create games table and seed initial data
-- Depends on: rivals (run 02 first)

CREATE TABLE games (
  id       INTEGER PRIMARY KEY,
  rival_id INTEGER NOT NULL REFERENCES rivals(id) ON DELETE RESTRICT,
  date     DATE    NOT NULL
);

INSERT INTO games (id, rival_id, date) VALUES
  (1, 1, '2026-06-17'),
  (2, 2, '2026-06-26'),
  (3, 3, '2026-06-09');
