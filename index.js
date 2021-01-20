const { ApolloServer , PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config')
const typeDefs = require('./graphql/typeDefs')

const pubSub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }), 
})

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log('Se conecto');
  return server.listen({ port: 5000 })
})
  .then(res => { console.log(`Server running at ${res.url}`); })
