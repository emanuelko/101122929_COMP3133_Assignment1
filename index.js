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
const app = express()
app.use(bodyParser.json())
app.use("*", cors())
const sample_users = require('./src/data.js')

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
    
    app.post("/api/users/login", (req,res) => {
        const {email,password} = req.body
        const user = sample_users.find(user => user.email === email && user.password === password)

        if(user){
            res.send(generateTokenResponse(user))
            res.status(200).send("login successful")
        }else{
            res.status(400).send("credentials not valid")
        }
    })

    const generateTokenResponse = (user)=>{
        const token = jwt.sign({
            email: user.email
        },"randomkey", {
            expiresIn:"10d"
        })
        user.token = token
        return user
    }


    app.listen(5000, () =>{
        console.log(`server running on http://localhost:5000`) //${server.graphqlPath}
    })
})





