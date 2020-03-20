import React from 'react';
import './App.css';
import CreateNote from './components/notes/CreateNote';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AllStudents from './components/notes/AllStudents';

// const kafkaConsumer = require('./kafka').consumer;
const GET_DOGS = gql`
  {
    findAllStudents {
      id
      first_name
      last_name
      email
    }
  }
`;

const STUDENTS_SUBSCRIPTION = gql`
  subscription{
    studentUpdatedSub{
      id
      first_name
    }
  }
`;

const App: React.FC = () => {
  const {  subscribeToMore, data } = useQuery(GET_DOGS);
  // const { data, loading } = useSubscription(STUDENTS_SUBSCRIPTION);
  // if(loading){
  //   console.log("loading");
  // }
  // if(error){
  //   console.log(error);
  // }
  // if(data){
    console.log("data")
  // }


  return (
    <div>
      <CreateNote></CreateNote>
      <ul>
       <AllStudents data={data} 
          subscribeToNewStudents={() =>
            subscribeToMore({
              document: STUDENTS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data;
                return Object.assign({}, prev, {
                    findAllStudents: [{id:123,first_name:"firesname",last_name:"lastname",email:"email",__typename: "Student"}, ...prev.findAllStudents]
                });
              }
            })
          }
       ></AllStudents>
      </ul>
    </div>
  );
}

export default App;
