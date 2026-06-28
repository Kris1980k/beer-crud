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
  (r.initial + r.added - r.remaining)
    * p.price                         AS revenue,

  -- Internal fields used for joins / further filtering
  p.price                             AS unit_price,
  r.product_id                        AS product_id,
  r.zone_id                           AS zone_id,
  r.game_id                           AS game_id

FROM records r
JOIN products p ON p.id = r.product_id
JOIN zones    z ON z.id = r.zone_id
JOIN games    g ON g.id = r.game_id;
