import React, { useState } from 'react';
// import { useCreateNoteMutation } from '../../generated-types';
import {Button, TextField, Card} from '@material-ui/core';
import './Note.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    createStudent(studentInput:{first_name:"new name",last_name:"new last name",email:"testsix@test.com"}){
        first_name
        last_name
        email
    }
  }
`;

const CreateNote: React.FC = () => {
    const [createStudent, { data }] = useMutation(ADD_TODO);
    const [newStudentFirstName, setNewStudentFirstName] = useState("");
    const [newStudentLastName, setNewStudentLastName] = useState("");
    const [newStudentEmail, setNewStudentEmail] = useState("");

    return(
        <div>
            <Card className="inputCard">
                <form noValidate autoComplete="off" className="inputForm">
                <h3>Create Note</h3>
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
                        createStudent({ variables: {type:"sfsfsfs"} });
                    }}>Add Note</Button>
                </form>
            </Card>
        </div>
    );
}

export default CreateNote;