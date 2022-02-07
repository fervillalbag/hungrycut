import { LoginType, RegisterInputType } from "types/User";
import userController from "../controllers/user";

const resolvers = {
  Query: {
    hello: () => "Hello hungryCut project",
  },

  Mutation: {
    register: (_: any, { input }: { input: RegisterInputType }) =>
      userController.register(input),
    login: (_: any, { input }: { input: LoginType }) =>
      userController.login(input),
  },
};

export default resolvers;
