-- Migration: Create the view_series view
-- Depends on: series (05), rivals (02), games (06)
-- This is a read-only view — not a real table.
-- Lists all series along with the rival name (joined via rival_id).
-- start_date/end_date are derived from the games in each series,
-- since the series table itself has no date columns.

CREATE VIEW view_series AS
SELECT
  s.id         AS series_id,
  s.rival_id   AS rival_id,
  rv.name      AS rival,
  TO_CHAR(MIN(g.date), 'DD-MM-YYYY') AS start_date,
  TO_CHAR(MAX(g.date), 'DD-MM-YYYY') AS end_date
FROM series s
JOIN rivals rv ON rv.id = s.rival_id
LEFT JOIN games g ON g.series_id = s.id
GROUP BY s.id, s.rival_id, rv.name;
