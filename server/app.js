const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb+srv://tester:tester123@cluster0-9sdzj.mongodb.net/test?retryWrites=true")
mongoose.connection.once('open', () => {console.log('connected to DB')})

app.use('/BeMyGuest', graphqlHTTP({
    schema,
    graphiql: true
  }))
app.listen(5000, () => {console.log('Listening on port 5000')})