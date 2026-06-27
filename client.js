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
    
    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query('select * from view_registers')
    
    await CLIENT.end()

    return res.rows;
}
module.exports = { getProducts, getView }