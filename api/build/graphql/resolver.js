"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../controllers/user"));
const report_1 = __importDefault(require("../controllers/report"));
const resolvers = {
    Query: {
        // ** User ** //
        getUsers: () => user_1.default.getUsers(),
        getUser: (_, { id, username }) => user_1.default.getUser(id, username),
        // ** Report ** //
        getReports: (_, { idUser, date }) => report_1.default.getReports(idUser, date),
        getReport: (_, { id }) => report_1.default.getReport(id),
    },
    Mutation: {
        // ** User ** //
        register: (_, { input }) => user_1.default.register(input),
        login: (_, { input }) => user_1.default.login(input),
        // ** Report ** //
        createReport: (_, { input }, ctx) => report_1.default.createReport(input, ctx),
        updateReport: (_, { input, id }) => report_1.default.updateReport(input, id),
        deleteReport: (_, { id }) => report_1.default.deleteReport(id),
    },
};
exports.default = resolvers;
