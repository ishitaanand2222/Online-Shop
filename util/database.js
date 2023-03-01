//this is will help us to connect to the SQL database
const mysql = require('mysql2');

//since for our project connecting to the database we need to a connection and for each query we want a new connection and that connection should be close.
//But the better of making that connection is to make a connection pool wherein a query can take connection as and when it needs
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: ''
});

module.exports = pool.promise();