const express = require('express')
const mongoose = require('mongoose')
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const app = express()
app.use(bodyParser.json())
app.use("*", cors())

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

    app.listen(4000, () =>{
        console.log(`server running on http://localhost:4000${server.graphqlPath}`)
    })
})





