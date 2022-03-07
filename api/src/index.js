const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");

dotenv.config({ path: ".env" });

const mongodbUri = process.env.MONGODB_URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET_KEY_LOGIN
        );
        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log(`Server is running at: ${res.url}`);
  })
  .catch((error) => {
    console.log(error);
  });
