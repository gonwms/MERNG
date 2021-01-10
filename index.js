const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag');
const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
  typeDefs, resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log('Se conecto');
  return server.listen({ port: 5000 })
})
  .then(res => { console.log(`Server running at ${res.url}`); })
