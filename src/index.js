const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    items: [String]!
  }

  type Mutation {
    pushItem: String!): Int!
    popItem: String
  }
`;

const items = ["apple", "bed"];

const resolvers = {
  Query: {
    greetings: () => items
  },
  Mutation: {
    addGreeting: (root, { greeting }) => items.push(greeting) && items.length,
    clearGreeting: () => items.length && items.pop()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Itemserver ready at ${url}`);
});
