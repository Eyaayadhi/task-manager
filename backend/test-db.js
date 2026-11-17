
require('dotenv').config({ path: __dirname + '/.env' });

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('MySQL connection successful!');
    }

    db.end();
});
