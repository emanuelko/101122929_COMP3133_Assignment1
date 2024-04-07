const express = require('express')
const mongoose = require('mongoose')
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const user = require('./models/user')
const employeeRouter = require("./src/router/employee.router.js")
const userRouter = require("./src/router/user.router.js")
const app = express()
app.use(bodyParser.json())
app.use("*", cors())
app.use("/api/employees", employeeRouter)
app.use("/api/users", userRouter)


const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

server.start().then(() => {
    server.applyMiddleware({app})

    mongoose.connect('mongodb+srv://eman:comp3133password@cluster0.9zcrv.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(success => {
        console.log('Success Mongodb connection')
    }).catch(err => {
        console.log('Error Mongodb connection')
    });

    app.listen(5000, () =>{
        console.log(`server running on http://localhost:5000`) //${server.graphqlPath}
    })
})





