const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/BeMyGuest', graphqlHTTP({
    schema,
    graphiql: true
  }))
app.listen(5000, () => {console.log('Listening on port 5000')})