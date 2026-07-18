-- Migration: Create the view_registers view
-- Depends on: records (07), products (01), zones (03), games (06), series (05), rivals (02)
-- This is a read-only aggregated view — not a real table.
-- It groups records by product, zone, game and series, and computes totals.

CREATE VIEW view_registers AS
SELECT
  p.name                              AS product,
  r.initial                           AS initial,
  r.added                             AS added,
  (r.initial + r.added)               AS total,
  (r.initial + r.added - r.remaining) AS selled,
  r.remaining                         AS remaining,
  p.price                             AS unit_price,
  (r.initial + r.added - r.remaining)
    * p.price                         AS revenue,

  s.id                                AS series_id,
  s.name                              AS series_name,
  rv.name                             AS rival,

  -- Internal fields used for joins / further filtering
  r.product_id                        AS product_id,
  r.zone_id                           AS zone_id,
  r.game_id                           AS game_id

FROM records r
JOIN products p ON p.id = r.product_id
JOIN zones    z ON z.id = r.zone_id
JOIN games    g ON g.id = r.game_id
JOIN series   s ON s.id = g.series_id
JOIN rivals   rv ON rv.id = s.rival_id;
