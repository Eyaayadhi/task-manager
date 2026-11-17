
require('dotenv').config({ path: __dirname + '/.env' });

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    // Secure TLS connection for TiDB Cloud
    ssl: process.env.DB_SSL === 'true'
        ? { minVersion: 'TLSv1.2' }
        : undefined
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
        return;
    }

    console.log('Connected to MySQL successfully!');
});

module.exports = db;
