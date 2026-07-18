-- Migration: Create products table and seed initial data
-- Run this first — other tables depend on nothing yet

CREATE TABLE products (
  id    INTEGER PRIMARY KEY,
  name  VARCHAR NOT NULL,
  price FLOAT   NOT NULL
);

INSERT INTO products (id, name, price) VALUES
  (0, 'Coke',  30.00),
  (1, 'Water', 25.00),
  (2, 'Sode',  70.00);

-- Migration: Create rivals table and seed initial data

CREATE TABLE rivals (
  id   INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO rivals (id, name) VALUES
  (1, 'Tomateros'),
  (2, 'Charros'),
  (3, 'Canheros'),
  (4, 'Mayos'),
  (5, 'Aguilas');

-- Migration: Create zones table and seed initial data

CREATE TABLE zones (
  id   INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO zones (id, name) VALUES
  (1, 'Norte'),
  (2, 'Central'),
  (3, 'Superior');

-- Migration: Create users table and seed initial data

CREATE TABLE users (
  id         INTEGER PRIMARY KEY,
  username   VARCHAR   NOT NULL,
  role       VARCHAR   NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, username, role) VALUES
  (0, 'Admin', 'admin'),
  (1, 'Dario', 'user');

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
