import { LoginType, RegisterInputType } from "types/User";
import userController from "../controllers/user";
import reportController from "../controllers/report";
import { ReportTypeInput } from "types/Report";

const resolvers = {
  Query: {
    // ** User ** //
    getUsers: () => userController.getUsers(),
    getUser: (
      _: any,
      { id, username }: { id: string; username: string }
    ) => userController.getUser(id, username),

    // ** Report ** //
    getReports: (_: any, { idUser }: { idUser: string }) =>
      reportController.getReports(idUser),
    getReport: (_: any, { id }: { id: string }) =>
      reportController.getReport(id),
  },

  Mutation: {
    // ** User ** //
    register: (_: any, { input }: { input: RegisterInputType }) =>
      userController.register(input),
    login: (_: any, { input }: { input: LoginType }) =>
      userController.login(input),

    // ** Report ** //
    createReport: (
      _: any,
      { input }: { input: ReportTypeInput },
      ctx: any
    ) => reportController.createReport(input, ctx),
    updateReport: (
      _: any,
      { input, id }: { input: ReportTypeInput; id: string }
    ) => reportController.updateReport(input, id),
    deleteReport: (_: any, { id }: { id: string }) =>
      reportController.deleteReport(id),
  },
};

export default resolvers;
