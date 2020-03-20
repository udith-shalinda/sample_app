import React from 'react';
import './App.css';
import CreateNote from './components/notes/CreateNote';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AllStudents from './components/notes/AllStudents';

// const kafkaConsumer = require('./kafka').consumer;
const GET_ALL_STUDENTS = gql`
  {
    findAllStudents {
      id
      first_name
      last_name
      email
    }
  }
`;

const STUDENTS_UPDATE_SUBSCRIPTION = gql`
  subscription{
    studentUpdatedSub{
      id
      first_name
      last_name
      email
    }
  }
`;
const STUDENTS_ADD_SUBSCRIPTION = gql`
  subscription{
    studentAddedSub{
      id
      first_name
      last_name
      email
    }
  }
`;
const STUDENTS_DELETE_SUBSCRIPTION = gql`
  subscription{
    studentDeletedSub{
      id
      first_name
      last_name
      email
    }
  }
`;

const App: React.FC = () => {
  const {  subscribeToMore, data } = useQuery(GET_ALL_STUDENTS);

  return (
    <div>
      <CreateNote></CreateNote>
      <ul>
       <AllStudents data={data} 
          subscribeToUpdateStudents={() =>
            subscribeToMore({
              document: STUDENTS_UPDATE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data;
                return Object.assign({}, prev, {
                  data:{
                    findAllStudents: [newFeedItem, ...prev.findAllStudents]
                  }
                });
              }
            })
          }
          subscribeToNewStudents={() =>
            subscribeToMore({
              document: STUDENTS_ADD_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data;
                return Object.assign({}, prev, {
                  data:{
                    findAllStudents: [newFeedItem, ...prev.findAllStudents]
                  }
                });
              }
            })
          }
          subscribeToDeleteStudents={() =>
            subscribeToMore({
              document: STUDENTS_DELETE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.studentDeletedSub;
                console.log(subscriptionData.data.studentDeletedSub)
                return Object.assign({}, prev, {
                  data:{
                    findAllStudents: [newFeedItem, ...prev.findAllStudents]  
                  }
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
