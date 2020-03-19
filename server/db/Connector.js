// const { Client } = require('pg')

// const client = new Client({
//         user: 'postgresql',
//         password: 'postgres',
//         database: 'users',
//         host: 'localhost',
//         port: 55432
// })

// client.connect();
    
// exports.client=client;

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'mysqluser',
    password : 'mysqlpw',
    database : 'studentData'
    });

connection.connect(function(err) {
if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}

console.log('connected as id ' + connection.threadId);
});

exports.client = connection;