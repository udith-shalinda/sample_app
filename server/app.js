const express = require('express');
const graphqlHttp = require('express-graphql')
var cors = require('cors')
const resolvers = require('./graphql/resolvers/index');
const http = require('http');
const { ApolloServer,gql } = require('apollo-server-express');


const PORT = 4000;
const typeDefs = gql`
    type Student{
        id:ID!
        first_name:String!
        last_name:String!
        email:String!
    }
    type Parent{
        id:ID!
        name:String!
        tel:String!
        job:String!
    }
    input StudentInput{
        id:ID
        first_name:String
        last_name:String
        email:String
    }
    input ParentInput{
        id:ID
        name:String
        job:String
    }
    type Subscription {
        newStudent(input: StudentInput): Student!
        updatedStudent(input: StudentInput): Student!
        deletedStudent(input: StudentInput): Student!
      }
    
    type Query{
        findAllStudents:[Student!]!
        findAllParents:[Parent!]!
    }
    type Mutation{
        createParent(input:ParentInput):Parent
        createStudent(input: StudentInput): Student!
        updateStudent(input: StudentInput): Student!
        deleteStudent(input: StudentInput): Student!
    }
`;


const app = express();
const server = new ApolloServer({ typeDefs , resolvers });

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})