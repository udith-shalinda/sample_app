import React, { useState, useEffect } from 'react';
import './App.css';
import CreateStudent from './components/students/CreateStudent';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AllStudents from './components/students/AllStudents';

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
  let [students,setStudents]=useState(data)

  useEffect(() => {
    setStudents(data)
  }, [data])

  return (
    <div>
      <CreateStudent></CreateStudent>
      <ul>
       <AllStudents data={students} 
          subscribeToUpdateStudents={() =>
            subscribeToMore({
              document: STUDENTS_UPDATE_SUBSCRIPTION,
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
                const newFeedItem = subscriptionData.data.newStudent;
                setStudents({
                  findAllStudents: [...prev.findAllStudents,newFeedItem]
                });
                return Object.assign({}, prev, {
                  data:{
                    findAllStudents: [...prev.findAllStudents,newFeedItem]
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
                const newFeedItem = subscriptionData.data.deletedStudent;
                var index = prev.findAllStudents.map((x:any) => {
                  return x.id;
                }).indexOf(subscriptionData.data.deletedStudent.id);
                
                prev.findAllStudents.splice(index, 1);
                setStudents({
                  findAllStudents: [...prev.findAllStudents]
                });
                return Object.assign({}, prev, {
                  data:{
                    findAllStudents: [...prev.findAllStudents]  
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
