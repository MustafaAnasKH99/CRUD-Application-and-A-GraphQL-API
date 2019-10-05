const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
// const APP_PORT = require('./constants.example')
const session = require('express-session')

const app = express()
// const IS_PRODUCTION = app.get('env') === 'production'

// if(IS_PRODUCTION){
//     app.set('trust proxy', 1)
// }

app.use(cors())

// app.use(session({ // handles sessions
//   secret: 'keyboard cat', // <-- this should be a secret phrase
//   cookie: { secure: IS_PRODUCTION }, // <-- secure only in production
//   resave: true,
//   saveUninitialized: true
// })
// )

mongoose.connect("mongodb+srv://tester:tester123@cluster0-9sdzj.mongodb.net/main?retryWrites=true")
mongoose.connection.once('open', () => {console.log('connected to DB')})

app.use(
  '/BeMyGuest', 
  graphqlHTTP({
    schema,
    graphiql: true
  }))

app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
})

  const PORT = process.env.PORT || 5000
// app.listen(5000, () => {console.log('Listening on port 5000')})
app.listen(PORT, () => {console.log(`Server Listening on Port ${PORT}`)})
// app.listen(process.env.PORT || 5000, (url) => console.log(url) )