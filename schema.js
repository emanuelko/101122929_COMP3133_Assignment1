const { gql } = require('apollo-server-express')

exports.typeDefs = gql(`
type user {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
}

type Query {
    login(username: String!, password: String!): user
    getAllEmployees: [Employee]
    searchEmployeeById(_id: ID!): Employee
}

type Mutation {
    signup(username: String!, email: String!, password: String!): user
    addNewEmployee(first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        salary: Float!): Employee
    updateEmployeeById(_id: ID!,
        first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        salary: Float!): Employee
    deleteEmployeeById(_id: ID!): Employee
}
`)