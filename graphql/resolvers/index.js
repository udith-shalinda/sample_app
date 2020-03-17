const client = require('./../../db/Connector').client;

module.exports = {
    findAllStudents:async()=>{
        
        const text = 'Select * from Student';
        const res = await client.query(text)
            // console.log(res.rows[0])
            return res.rows;
    },
    findAllParents:()=>{
        return [];
    },
    createStudent:async(args)=>{
        
        const text = `INSERT INTO Student(name) VALUES($1) RETURNING *`
        const values = [args.studentInput]
        console.log(args.studentInput);
        const res = await client.query(text, values)
            // console.log(res.rows[0])
            return res.rows[0];
        // return null;
    },
    createParent:()=>{
        console.log(args.parentInput.name);
        return null;
    }
}


