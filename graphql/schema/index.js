const {buildSchema} = require('graphql')


module.exports = buildSchema(`
type Student{
    _id:ID!
    name:String!
    address:String!
    dob:String!
}
type Parent{
    _id:ID!
    name:String!
    tel:String!
    job:String!
}
input StudentInput{
    name:String!
    address:String!
    dob:String!
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
}

schema {
    query:RootQuery
    mutation:RootMutaion
}
`);