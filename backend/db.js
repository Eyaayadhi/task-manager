
require('dotenv').config({ path: __dirname + '/.env' });

const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    ssl: process.env.DB_SSL === 'true'
        ? { minVersion: 'TLSv1.2' }
        : undefined,

    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
        return;
    }

    console.log('Connected to MySQL successfully!');
    connection.release();
});

module.exports = db;
