import React, { useEffect } from 'react';
import OneNote from './OneNote';



const AllStudents = ({data,subscribeToNewStudents}: any) => {
    useEffect(() => {
        subscribeToNewStudents();
     }, []);

    return(
        <div>
            {
                data && data.findAllStudents.map((student:any) => (
                  <OneNote key={student.id} id={student.id} first_name={student.first_name} last_name={student.last_name} email={student.email}></OneNote>
                ))
              }
        </div>
    );
}

export default AllStudents;