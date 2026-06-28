async function getProducts(){
    
    const Client = require('pg').Client
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query('select * from products')
    
    await CLIENT.end()
    return res.rows;
}

async function getView(game, zone){
    
    const Client = require('pg').Client
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query(`SELECT * FROM view_registers WHERE game_id = ${game} AND zone_id = ${zone};`);
    
    await CLIENT.end()
    
    return res.rows;
}

async function getRivals(){
    
    const Client = require('pg').Client
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query(`SELECT * FROM rivals`);
    
    await CLIENT.end()
    
    return res.rows;
}

async function getGames(){
    
    const Client = require('pg').Client
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query(`SELECT * FROM games`);
    
    await CLIENT.end()
    
    return res.rows;
}

module.exports = { getProducts, getView, getRivals, getGames};