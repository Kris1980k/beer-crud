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

async function getView(){
    
    const Client = require('pg').Client
    console.log("Before");
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query('SELECT * FROM view_registers WHERE game_id = 1 AND zone_id = 2;');
    
    await CLIENT.end()
    
    return res.rows;
}
module.exports = { getProducts, getView }