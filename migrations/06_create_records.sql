-- Migration: Create records table
-- Depends on: products (01), zones (03), games (05)

CREATE TABLE records (
  id         SERIAL  PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  zone_id    INTEGER NOT NULL REFERENCES zones(id)    ON DELETE RESTRICT,
  game_id    INTEGER NOT NULL REFERENCES games(id)    ON DELETE RESTRICT,
  initial    INTEGER NOT NULL DEFAULT 0,
  added      INTEGER NOT NULL DEFAULT 0,
  remaining  INTEGER NOT NULL DEFAULT 0,
  merma      INTEGER NOT NULL DEFAULT 0  -- shrinkage / waste
);
