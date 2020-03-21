import React, { useEffect } from 'react';
import OneNote from './OneNote';

const AllStudents = ({data,subscribeToNewStudents,subscribeToUpdateStudents,subscribeToDeleteStudents}: any) => {
    useEffect(() => {
        subscribeToUpdateStudents();
        subscribeToNewStudents();
        subscribeToDeleteStudents();
     }, []);


     console.log(data ? data:"nothing");

    return(
        <div>
            {
                data && data.findAllStudents.map((student:any) => (
                  <OneNote 
                    key={student.id} 
                    student={student}
                    ></OneNote>
                ))
              }
        </div>
    );
}

export default AllStudents;