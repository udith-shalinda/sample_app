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
        console.log(args)
        const text = `INSERT INTO students SET ?`;

        const result = new Promise(function(resolve, reject){
            client.query(text ,args.studentInput ,(err,res,fields)=>{
                if(err)console.log(err);
                console.log(res)
                const new_text = `Select * from students where id=${res.insertId}`;
                client.query(new_text,(err,res2,fields)=>{
                    if(err)console.log(err);
                    resolve(res2)
                });
            });
        });
        
        console.log(result);
        return result;
    },
    createParent:()=>{
        console.log(args.parentInput.name);
        return null;
    },
    updateStudent:async(args)=>{
        const text = 'UPDATE students SET ? WHERE id = ?';
        const result = new Promise(function(resolve, reject){
            client.query(text,[args.studentInput,args.id],(err,res,fields)=>{
                resolve(res)
            });
        });
        return result;
    }
}


