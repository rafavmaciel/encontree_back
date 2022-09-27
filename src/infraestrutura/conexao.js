console.log(process.env.HOST)

const db  = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    }
})


module.exports = db;
