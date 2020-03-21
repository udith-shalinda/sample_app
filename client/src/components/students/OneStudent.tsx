import React, { useState } from 'react';
import EditStudent from './EditStudent';
import { Button, Card } from '@material-ui/core';
import './Student.css'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_STUDNET = gql`
  mutation DeleteStudent($id:ID!) {
    deleteStudent(input:{id:$id}){
        first_name
    }
  }
`;

const OneStudent = ({student }: any) => {
    const [studentEdit,setStudentEdit]=useState(false)
    const [deleteStudent] = useMutation(DELETE_STUDNET);
    
    console.log("one Student");

    return(
        <div>
            <Card className="inputCard">
                <li className="OneStudent">
                <strong>{student.id+student.first_name +" "+ student.last_name}</strong>:&nbsp;
                {student.email}
                <Button onClick={()=>setStudentEdit(!studentEdit)} variant="outlined" color="primary" >Edit</Button>
                <Button onClick={()=>{deleteStudent({variables:{id:student.id}})}} variant="outlined" color="primary" >Delete</Button>
                {studentEdit?<EditStudent id={student.id} first_name={student.first_name} last_name={student.last_name} email={student.email} editState={setStudentEdit}></EditStudent>:<div></div>}
                </li>
            </Card>
        </div>
    );
}

export default OneStudent;