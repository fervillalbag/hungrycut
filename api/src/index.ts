import { ApolloServer } from "apollo-server";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolver";

dotenv.config({ path: ".env" });

const mongodbUri: any = process.env.MONGODB_URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET_KEY_LOGIN as string
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
  } as ConnectOptions)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT });
  })
  .then((res: any) => {
    console.log(`Server is running at: ${res.url}`);
  })
  .catch((error: any) => {
    console.log(error);
  });
