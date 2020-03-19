import React, { useState } from 'react';
import EditNote from './EditNote';
// import { Note } from '../../generated-types';
import CreateComment from '../comment/CreateComment';
import OneComment from '../comment/OneComment';
import { Button, Card } from '@material-ui/core';



const OneNote = ({id, first_name, last_name,email }: any) => {
    const [noteEdit,setNoteEdit]=useState(false)
    const [addComment,setAddComment]=useState(false)
    


    return(
        <div>
            <Card className="inputCard">
                <li className="OneNote">
                <strong>{first_name +" "+ last_name}</strong>:&nbsp;
                {email}
                <Button onClick={()=>setNoteEdit(!noteEdit)} variant="outlined" color="primary" >Edit</Button>
                {noteEdit?<EditNote id={id} first_name={first_name} last_name={last_name} email={email} editState={setNoteEdit}></EditNote>:<div></div>}
                {addComment?<CreateComment noteId={id} addCommentState={setAddComment}></CreateComment>:<div></div>}
                </li>
            </Card>
        </div>
    );
}

export default OneNote;