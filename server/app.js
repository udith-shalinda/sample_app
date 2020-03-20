const express = require('express');
const graphqlHttp = require('express-graphql')
var cors = require('cors')
const {PubSub} = require('apollo-server-express');
const pubsub = new PubSub();

// const graphSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const http = require('http');
const { ApolloServer,gql } = require('apollo-server-express');
// const {typeDefs} = require('./graphql/schema/index');


        // var kafka = require('kafka-node'),
        // Consumer = kafka.Consumer,
        // client = new kafka.KafkaClient(),
        // consumer = new Consumer(
        //     client,
        //     [
        //         { topic: 'dbserver2.studentData.students', partition: 0 },
        //         // { topic: 'dbserver2.studentData.parents', partition: 0 }

        //     ],
        //     {
        //         autoCommit: false
        //     }
        // );
        // consumer.on('message', function (message) {
        //     // console.log(message);
        //     const json = JSON.parse(message.value);
        //     if(json!==null&& json.payload.source.table==="students"){
        //         if(json.payload.before===null){
        //             if(json.payload.after!==null){
        //                 console.log("new element added");
        //                 // pubsub.publish("studentAddedSub", json.payload.after);
        //             }
        //         }else if(json.payload.after===null){
        //             console.log("element deleted")
        //             // pubsub.publish("studentDeletedSub",json.payload.before);
        //         }else{
        //             console.log("element updated")
        //             // pubsub.publish("studentUpdatedSub",json.payload.after);
        //         }   
        //     }
        //     console.log(json);
        // });

// const app = express();
// app.use(cors());

// app.listen(4000);

// app.use("/graphql",graphqlHttp({
//     schema:graphSchema,
//     rootValue:resolvers,
//     graphiql:true
// }));

// module.exports = app;


const PORT = 4000;
const typeDefs = gql`
    type Student{
        id:Int!
        first_name:String!
        last_name:String!
        email:String!
    }
    type Parent{
        _id:ID!
        name:String!
        tel:String!
        job:String!
    }
    input StudentInput{
        first_name:String!
        last_name:String!
        email:String!
    }
    input ParentInput{
        name:String!
        tel:String!
        job:String!
    }
    type Subscription {
        studentAddedSub: Student
        studentUpdatedSub:Student
        studentDeletedSub:Student
      }
    
    type Query{
        findAllStudents:[Student!]!
        findAllParents:[Parent!]!
    }
    type Mutation{
        createStudent(studentInput:StudentInput):Student
        createParent(parentInput:ParentInput):Parent
        updateStudent(id:Int,studentInput:StudentInput):Student
        deleteStudent(id:Int):Student
    }

`;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!'
//   },
// };
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
