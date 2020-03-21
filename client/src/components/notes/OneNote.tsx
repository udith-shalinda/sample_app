import React, { useState } from 'react';
import EditNote from './EditNote';
import { Button, Card } from '@material-ui/core';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_STUDNET = gql`
  mutation DeleteStudent($id:ID!) {
    deleteStudent(input:{id:$id}){
        first_name
    }
  }
`;

const OneNote = ({student }: any) => {
    const [noteEdit,setNoteEdit]=useState(false)
    const [deleteStudent] = useMutation(DELETE_STUDNET);
    
    console.log("one note");

    return(
        <div>
            <Card className="inputCard">
                <li className="OneNote">
                <strong>{student.id+student.first_name +" "+ student.last_name}</strong>:&nbsp;
                {student.email}
                <Button onClick={()=>setNoteEdit(!noteEdit)} variant="outlined" color="primary" >Edit</Button>
                <Button onClick={()=>{deleteStudent({variables:{id:student.id}});setNoteEdit(!noteEdit);}} variant="outlined" color="primary" >Delete</Button>
                {noteEdit?<EditNote id={student.id} first_name={student.first_name} last_name={student.last_name} email={student.email} editState={setNoteEdit}></EditNote>:<div></div>}
                </li>
            </Card>
        </div>
    );
}

export default OneNote;