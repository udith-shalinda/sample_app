import React, { useState } from 'react';
import {Button, TextField, Card} from '@material-ui/core';
import './Note.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_STUDNET = gql`
  mutation UpdateStudent($id:Int!,$first_name: String!,$last_name:String!,$email:String!) {
    updateStudent(id:$id,studentInput:{first_name:$first_name,last_name:$last_name,email:$email}){
        first_name
    }
  }
`;

const EditNote = ({id, first_name, last_name,email,editState }: any) => {
    const [updateStudent] = useMutation(UPDATE_STUDNET);
    const [newStudentFirstName, setNewStudentFirstName] = useState(first_name);
    const [newStudentLastName, setNewStudentLastName] = useState(last_name);
    const [newStudentEmail, setNewStudentEmail] = useState(email);


    return(
        <div>
            <Card className="inputCard">
                <form noValidate autoComplete="off" className="inputForm">
                <h3>Edit Note</h3>
                <TextField 
                    label="Title" 
                    variant="outlined" 
                    onChange={(e) => setNewStudentFirstName(e.target.value)}
                    value={newStudentFirstName}
                   
                    />
                <TextField 
                    label="Description" 
                    variant="outlined" 
                    onChange={(e) => setNewStudentLastName(e.target.value)}
                    value={newStudentLastName}
                    
                />
                <TextField 
                    label="Description" 
                    variant="outlined" 
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    value={newStudentEmail}
                    
                />
                <Button variant="outlined" color="primary" 
                    onClick={()=>{
                        updateStudent({ variables: { id:id,first_name:newStudentFirstName,last_name:newStudentLastName,email:newStudentEmail } });
                        editState(false);
                    }}>Update Note</Button>
                </form>
            </Card>
        </div>
    );
}

export default EditNote;