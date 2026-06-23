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
