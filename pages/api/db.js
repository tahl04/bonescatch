const { createPool } = require('mysql');

const pool = createPool({
    host: process.env.NEXT_PUBLIC_HOST,
    user: process.env.NEXT_PUBLIC_USER,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    port: process.env.NEXT_PUBLIC_PORT,
    database: process.env.NEXT_PUBLIC_DATABASE,
});


const executeQuery = async (query, arraParms) => {
    return await new Promise((resolve) => {
        pool.query(query, arraParms, (err, data) => {
            resolve(data)
        });
    })

}

module.exports = { executeQuery };