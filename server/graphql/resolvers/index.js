const client = require('./../../db/Connector').client;

module.exports = {
    findAllStudents:async()=>{
        
        const text = 'Select * from students';
        const result = new Promise(function(resolve, reject){
            client.query(text,(err,res,fields)=>{
                resolve(res)
            });
        });
        return result;
    },
    findAllParents:()=>{
        const text = 'Select * from parents';
        const result = new Promise(function(resolve, reject){
            client.query(text,(err,res,fields)=>{
                resolve(res)
            });
        });
        return result;
    },
    createStudent:async(args)=>{
        const text = `INSERT INTO students SET ?`;

        const result = await new Promise(function(resolve, reject){
            client.query(text ,args.studentInput ,(err,res,fields)=>{
                if(err)console.log(err);
                const new_text = `Select * from students where id=${res.insertId}`;
                client.query(new_text,(err,res2,fields)=>{
                    if(err)console.log(err);
                    resolve(res2[0])
                });
            });
        });
        
        console.log(result);
        return result;
    },
    createParent:async()=>{
        const text = `INSERT INTO parents SET ?`;

        const result = await new Promise(function(resolve, reject){
            client.query(text ,args.studentInput ,(err,res,fields)=>{
                if(err)console.log(err);
                const new_text = `Select * from parents where id=${res.insertId}`;
                client.query(new_text,(err,res2,fields)=>{
                    if(err)console.log(err);
                    resolve(res2[0])
                });
            });
        });
        
        console.log(result);
        return result;
    },
    updateStudent:async(args)=>{
        const text = 'UPDATE students SET ? WHERE id = ?';
        const result = await new Promise(function(resolve, reject){
            client.query(text,[args.studentInput,args.id],(err,res,fields)=>{
                if(err)console.log(err);
                const new_text = `Select * from students where id=${args.id}`;
                client.query(new_text,(err,res2,fields)=>{
                    if(err)console.log(err);
                    resolve(res2[0])
                });
            });
        });
        return result;
    },
    deleteStudent:async(args)=>{
        const text = `Select * from students where id=${args.id}`;
        const result = await new Promise(function(resolve, reject){
            client.query(text ,args.id ,(err,res,fields)=>{
                if(err)console.log(err);
                const new_text = `DELETE FROM students WHERE id=${args.id}`;
                client.query(new_text,(err,res2,fields)=>{
                    if(err)console.log(err);
                    resolve(res[0])
                });
            });
        });
        return result;
    }
}


