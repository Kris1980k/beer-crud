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

async function getRegistries(game) {
    const res = await pool.query(
        `SELECT zone_id FROM view_registers WHERE game_id = $1`,
        [game]
    );
    return res.rows;
}

async function getSales(game, zone) {
    /*const res = await pool.query(
        `SELECT zone_id, game_id, to_char(games.date,'dd/MM/yyyy') AS date, rivals.name
         FROM view_registers
         INNER JOIN games ON view_registers.game_id = games.id
         INNER JOIN rivals ON games.rival_id = rivals.id
         WHERE view_registers.game_id = $1 AND view_registers.zone_id = $2`,
        [game, zone]
    );*/

    const res = await pool.query(
        `SELECT * FROM view_registers WHERE game_id = $1 AND zone_id = $2`,
        [game, zone]
    );
    return res.rows;
}

async function getRivals() {
    const res = await pool.query('SELECT * FROM rivals');
    return res.rows;
}

async function getSeries() {
    const res = await pool.query('SELECT * FROM series');
    return res.rows;
}

async function getSeriesView() {
    const res = await pool.query('SELECT * FROM view_series');
    return res.rows;
}

async function getZones() {
    const res = await pool.query('SELECT * FROM zones');
    return res.rows;
}

async function getGames(serie_id) {
    const res = await pool.query(`SELECT * from games where games.series_id =$1  ORDER BY date DESC`,
        [serie_id]
    );
    console.log(res.rows);
    
    return res.rows;
}
module.exports = { getProducts, getRegistries, getRivals, getGames, getZones, getSales, getSeries,getSeriesView };