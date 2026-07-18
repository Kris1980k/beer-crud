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
