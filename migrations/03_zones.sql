-- Migration: Create zones table and seed initial data

CREATE TABLE zones (
  id   INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO zones (id, name) VALUES
  (1, 'Norte'),
  (2, 'Central'),
  (3, 'Superior');
