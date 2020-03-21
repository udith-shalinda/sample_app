import React, { useState } from 'react';
import {Button, TextField, Card} from '@material-ui/core';
import './Student.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_STUDENT = gql`
  mutation AddTodo($first_name: String!,$last_name:String!,$email:String!) {
    createStudent(input:{first_name:$first_name,last_name:$last_name,email:$email}){
        first_name
    }
  }
`;

const CreateStudent: React.FC = () => {
    const [createStudents] = useMutation(ADD_STUDENT);
    const [newStudentFirstName, setNewStudentFirstName] = useState("");
    const [newStudentLastName, setNewStudentLastName] = useState("");
    const [newStudentEmail, setNewStudentEmail] = useState("");

    return(
        <div>
            <Card className="inputCard">
                <form noValidate autoComplete="off" className="inputForm">
                <h3>Create Student</h3>
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
                        createStudents({ variables: {first_name:newStudentFirstName,last_name:newStudentLastName,email:newStudentEmail} });
                    }}>Add Student</Button>
                </form>
            </Card>
        </div>
    );
}

export default CreateStudent;