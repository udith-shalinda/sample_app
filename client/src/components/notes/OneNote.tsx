import React, { useState } from 'react';
import EditNote from './EditNote';
import { Button, Card } from '@material-ui/core';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_STUDNET = gql`
  mutation DeleteStudent($id:Int!) {
    deleteStudent(id:$id){
        first_name
    }
  }
`;

const OneNote = ({id, first_name, last_name,email }: any) => {
    const [noteEdit,setNoteEdit]=useState(false)
    const [deleteStudent] = useMutation(DELETE_STUDNET);
    
    
    // console.log(data);

    return(
        <div>
            <Card className="inputCard">
                <li className="OneNote">
                <strong>{id+first_name +" "+ last_name}</strong>:&nbsp;
                {email}
                <Button onClick={()=>setNoteEdit(!noteEdit)} variant="outlined" color="primary" >Edit</Button>
                <Button onClick={()=>deleteStudent({variables:{id:id}})} variant="outlined" color="primary" >Delete</Button>
                {noteEdit?<EditNote id={id} first_name={first_name} last_name={last_name} email={email} editState={setNoteEdit}></EditNote>:<div></div>}
                </li>
            </Card>
        </div>
    );
}

export default OneNote;