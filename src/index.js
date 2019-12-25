const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    items: [String]!
  }

  type Mutation {
    pushItem(item: String!): Int!
    popItem: String
  }
`;

const items = ["apple", "bed"];

const resolvers = {
  Query: {
    items: () => items
  },
  Mutation: {
    pushItem: (root, { item }) => items.push(item) && items.length,
    popItem: () => items.length && items.pop()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Itemserver ready at ${url}`);
});
