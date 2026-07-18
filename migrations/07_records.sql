-- Migration: Create records table
-- Depends on: products (01), zones (03), games (06)

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

INSERT INTO records (product_id, zone_id, game_id, initial, added, remaining, merma) VALUES
  (0, 1, 1, 100, 20, 30, 2),
  (1, 1, 1,  80, 10, 15, 1),
  (2, 1, 1,  50,  0, 10, 0),
  (0, 2, 1,  60, 10, 20, 1),
  (1, 2, 1,  40,  5,  5, 0),
  (0, 3, 1,  30,  0,  5, 0),
  (0, 1, 2,  90, 15, 25, 3),
  (1, 1, 2,  70, 20, 10, 2),
  (2, 2, 2,  45,  5,  8, 1),
  (0, 2, 3,  55, 10, 12, 0),
  (1, 3, 3,  35,  0,  7, 1),
  (2, 3, 3,  25,  5,  3, 0);
