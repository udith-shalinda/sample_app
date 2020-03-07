const express = require('express');
const graphqlHttp = require('express-graphql')
const bodyParser = require('body-parser')

const graphSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');


const app = express();
app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
    next();
});

app.listen(5000);

app.use("/graphql",graphqlHttp({
    schema:graphSchema,
    rootValue:resolvers,
    graphiql:true
}));

module.exports = app;