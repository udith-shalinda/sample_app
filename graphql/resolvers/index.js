module.exports = {
    findAllStudents:()=>{
        return [];
    },
    findAllParents:()=>{
        return [];
    },
    createStudent:(args)=>{
        console.log(args.studentInput.name);
        return null;
    },
    createParent:()=>{
        console.log(args.parentInput.name);
        return null;
    }
}