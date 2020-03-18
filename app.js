const express = require('express');
const graphqlHttp = require('express-graphql')
// const bodyParser = require('body-parser')
// const { Client } = require('pg')

const graphSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');


    //pg connection
        // const tableCreate = `CREATE TABLE Student(id VARCHAR(40), name VARCHAR(40) not null, address VARCHAR(40),dob VARCHAR(40))`;
        // const text = 'INSERT INTO Student(name, address,dob) VALUES($1, $2,$3) RETURNING *'
        // const values = ['brianc', '123 address','12-23-2']

        // const client = new Client({
        //     user: 'postgresql',
        //     password: 'postgres',
        //     database: 'users',
        //     host: 'localhost',
        //     port: 55432
        // })
        // client.connect()
        // client.query('SELECT NOW()', (err, res) => {
        // //   console.log(err, res)
        // //   client.end()
        // })
        
    //mysql connection
        // var mysql      = require('mysql');
        // var connection = mysql.createConnection({
        //     host     : 'localhost',
        //     user     : 'mysqluser',
        //     password : 'mysqlpw',
        //     database : 'inventory'
        //   });
        
        // connection.connect(function(err) {
        // if (err) {
        //     console.error('error connecting: ' + err.stack);
        //     return;
        // }
        
        // console.log('connected as id ' + connection.threadId);
        // });
        
        // connection.query('show tables', function (error, results, fields) {
        //     if (error) throw error;
        //     console.log(results);
        //   });
        // connection.query('select * from customers', function (error, results, fields) {
        // if (error) throw error;
        // console.log(results);
        // });
        // connection.query("UPDATE customers SET first_name='Anne haha' WHERE id=1004;",function (error, results, fields) {
        //   if (error) throw error;
        //   console.log(results);
        //   });


        var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.KafkaClient(),
        consumer = new Consumer(
            client,
            [
                { topic: 'dbserver1.inventory.customers', partition: 0 }
            ],
            {
                autoCommit: false
            }
        );
        consumer.on('message', function (message) {
            console.log(message);
        });

const app = express();
app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
    next();
});

app.listen(4000);

app.use("/graphql",graphqlHttp({
    schema:graphSchema,
    rootValue:resolvers,
    graphiql:true
}));

module.exports = app;