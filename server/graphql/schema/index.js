const {buildSchema} = require('graphql')


module.exports = buildSchema(`
type Student{
    id:Int!
    first_name:String!
    last_name:String!
    email:String!
}
type Parent{
    _id:ID!
    name:String!
    tel:String!
    job:String!
}
input StudentInput{
    first_name:String!
    last_name:String!
    email:String!
}
input ParentInput{
    name:String!
    tel:String!
    job:String!
}

type RootQuery{
    findAllStudents:[Student!]!
    findAllParents:[Parent!]!
}
type RootMutaion{
    createStudent(studentInput:StudentInput):Student
    createParent(parentInput:ParentInput):Parent
    updateStudent(id:Int,studentInput:StudentInput):Student
    deleteStudent(id:Int):Student
}

schema {
    query:RootQuery
    mutation:RootMutaion
}
`);