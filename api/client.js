const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    max: 10,                     // max simultaneous connections in pool
    idleTimeoutMillis: 30000,    // close idle clients after 30s
    connectionTimeoutMillis: 5000 // fail fast if can't get a connection
});

async function getProducts() {
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
}

async function getView(game, zone) {
    const res = await pool.query(
        `SELECT zone_id, game_id, to_char(games.date,'dd/MM/yyyy') AS date, rivals.name
         FROM view_registers
         INNER JOIN games ON view_registers.game_id = games.id
         INNER JOIN rivals ON games.rival_id = rivals.id
         WHERE view_registers.game_id = $1 AND view_registers.zone_id = $2`,
        [game, zone]
    );
    return res.rows;
}

async function getRivals() {
    const res = await pool.query('SELECT * FROM rivals');
    return res.rows;
}

async function getGames() {
    const res = await pool.query(`SELECT rivals.name, to_char(games.date,'dd/MM/yyyy') AS date FROM games INNER JOIN rivals ON games.rival_id = rivals.id ORDER BY date DESC`);
    return res.rows;
}

module.exports = { getProducts, getView, getRivals, getGames };