import React, { useEffect } from 'react';
import OneStudent from './OneStudent';

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
                  <OneStudent 
                    key={student.id} 
                    student={student}
                    ></OneStudent>
                ))
              }
        </div>
    );
}

export default AllStudents;