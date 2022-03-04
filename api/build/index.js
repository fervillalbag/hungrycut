"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = __importDefault(require("./graphql/schema"));
const resolver_1 = __importDefault(require("./graphql/resolver"));
dotenv_1.default.config({ path: ".env" });
const mongodbUri = process.env.MONGODB_URI;
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolver_1.default,
    context: ({ req }) => {
        const token = req.headers.authorization;
        if (token) {
            try {
                const user = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY_LOGIN);
                return {
                    user,
                };
            }
            catch (error) {
                console.log(error);
            }
        }
    },
});
mongoose_1.default
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
