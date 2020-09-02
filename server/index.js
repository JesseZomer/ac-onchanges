const { ApolloServer, gql } = require('apollo-server');
var _ = require('lodash');

const typeDefs = gql`
  type Parent {
    id: ID!
    title: String
    children: [Child!]!
  }

  type Child {
    name: String!
    grandChildren: [GrandChild!]
  }

  type GrandChild {
    id: ID!
    name: String!
  }

  type Query {
    parent: Parent!
  }

  type Mutation {
    removeGrandchild: Boolean!
  }

`;

const resolvers = {
  Query: {
    parent: () => ({
      id: '1',
      title: 'parent',
      children: _.times(50, (index) => ({
        name: index,
        grandChildren: _.times(5, (i) => ({ id: `${index}-${i}`, name: i }))
      }))
    }),
  },
  Mutation: {
    removeGrandchild: () => true
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

