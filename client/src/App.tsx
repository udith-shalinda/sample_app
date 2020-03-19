import React from 'react';
import './App.css';
import CreateNote from './components/notes/CreateNote';
import OneNote from './components/notes/OneNote';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DOGS);
  if(loading){
    console.log("loading");
  }
  if(error){
    console.log(error);
  }


  return (
    <div>
      <CreateNote></CreateNote>
      <ul>
        {
          data && data.findAllStudents.map((student:any) => (
            <OneNote key={student.id} id={student.id} first_name={student.first_name} last_name={student.last_name} email={student.email}></OneNote>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
