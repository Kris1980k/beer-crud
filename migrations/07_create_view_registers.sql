-- Migration: Create the VIEW_registers view
-- Depends on: records (06), products (01), zones (03), games (05)
-- This is a read-only aggregated view — not a real table.
-- It groups records by product, zone, and game, and computes totals.

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

  -- Internal fields used for joins / further filtering
  r.product_id                        AS product_id,
  r.zone_id                           AS zone_id,
  r.game_id                           AS game_id

FROM records r
JOIN products p ON p.id = r.product_id
JOIN zones    z ON z.id = r.zone_id
JOIN games    g ON g.id = r.game_id;
