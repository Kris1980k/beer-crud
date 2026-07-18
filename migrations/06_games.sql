-- Migration: Create games table and seed initial data
-- Depends on: series (05)

CREATE TABLE games (
  id        INTEGER PRIMARY KEY,
  series_id INTEGER NOT NULL REFERENCES series(id) ON DELETE RESTRICT,
  date      DATE    NOT NULL
);

INSERT INTO games (id, series_id, date) VALUES
  (1, 1, '2026-06-17'),
  (2, 2, '2026-06-26'),
  (3, 3, '2026-06-09');

-- Ajusta start_date / end_date de cada série com base nos jogos reais
UPDATE series s
SET start_date = sub.min_date,
    end_date   = sub.max_date
FROM (
  SELECT series_id, MIN(date) AS min_date, MAX(date) AS max_date
  FROM games
  GROUP BY series_id
) sub
WHERE sub.series_id = s.id;
