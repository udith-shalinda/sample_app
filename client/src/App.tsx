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
  subscription  { 
    updatedStudent(input:{}){
      id
      first_name
      last_name
      email
    }
  }
`;
const STUDENTS_ADD_SUBSCRIPTION = gql`
  subscription{
    newStudent(input:{}){
      id
      first_name
      last_name
      email
    }
  }
`;
const STUDENTS_DELETE_SUBSCRIPTION = gql`
  subscription{
    deletedStudent(input:{}){
      id
      first_name
      last_name
      email
    }
  }
`;

const App: React.FC = () => {
  const {  subscribeToMore, data } = useQuery(GET_ALL_STUDENTS);
  console.log("App")

  return (
    <div>
      <CreateNote></CreateNote>
      <ul>
       <AllStudents data={data} 
          subscribeToUpdateStudents={() =>
            subscribeToMore({
              document: STUDENTS_UPDATE_SUBSCRIPTION,
              // variables: { id:2},
              updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.updatedStudent;
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
                const newFeedItem = {
                  ...subscriptionData.data.deletedStudent,
                  first_name:"deleted name",
                };
                console.log(subscriptionData.data.deletedStudent)
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
