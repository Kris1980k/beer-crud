
import { Client } from 'pg'

export default async function myPostgresClient(){
    console.log('holaaaa' , process.env.DB_USER);

    const CLIENT = await new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }).connect()

    const res = await CLIENT.query('select * from rivals')
    console.log(res.rows);
    await CLIENT.end()
}

