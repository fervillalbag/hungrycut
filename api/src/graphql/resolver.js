const userController = require("../controllers/user");
const reportController = require("../controllers/report");

const resolvers = {
  Query: {
    // ** User ** //
    getUsers: () => userController.getUsers(),
    getUser: (_, { id, username }) =>
      userController.getUser(id, username),

    // ** Report ** //
    getReports: (_, { idUser, date }) =>
      reportController.getReports(idUser, date),
    getReport: (_, { id }) => reportController.getReport(id),
  },

  Mutation: {
    // ** User ** //
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),

    // ** Report ** //
    createReport: (_, { input }, ctx) =>
      reportController.createReport(input, ctx),
    updateReport: (_, { input, id }) =>
      reportController.updateReport(input, id),
    deleteReport: (_, { id }) => reportController.deleteReport(id),
  },
};

module.exports = resolvers;
