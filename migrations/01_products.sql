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
