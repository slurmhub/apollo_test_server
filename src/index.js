const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    greetings: [String]!
  }

  type Mutation {
    addGreeting(greeting: String!): String!
    clearGreetings: String
  }
`;

const greetings = ["hello", "hey", "hi"];

const resolvers = {
  Query: {
    greetings: () => greetings
  },
  Mutation: {
    addGreeting: (root, { greeting }) => greetings.push(greeting) && greeting,
    clearGreetings: () => {
      while (greetings.length > 0) {
        greetings.pop();
      }
      return "done.";
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
