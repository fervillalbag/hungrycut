"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user, SECRET_KEY, expiresIn) => {
    const { id, name, username, email } = user;
    const payload = { id, name, username, email };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
};
const register = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();
    newUser.role = "user";
    const { email, username, password } = newUser;
    const foundEmail = yield user_1.default.findOne({ email });
    if (foundEmail)
        throw new Error("El email ya está en uso");
    const foundUsername = yield user_1.default.findOne({ username });
    if (foundUsername)
        throw new Error("El email ya está en uso");
    if (username === "category" ||
        username === "diet" ||
        username === "note" ||
        username === "notes" ||
        username === "recipe" ||
        username === "settings" ||
        username === "create" ||
        username === "explore" ||
        username === "login" ||
        username === "register" ||
        username === "saved" ||
        username === "search")
        throw new Error("El username ingresado no está en permitido");
    const salt = bcryptjs_1.default.genSaltSync(10);
    newUser.password = yield bcryptjs_1.default.hash(password, salt);
    try {
        const user = new user_1.default(newUser);
        yield user.save();
        return {
            message: "Usuario registrado correctamente",
            success: true,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Ha ocurrido un error al registrarse",
            success: false,
        };
    }
});
const login = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = input;
    const userFound = yield user_1.default.findOne({
        email: email.toLowerCase(),
    });
    if (!userFound)
        throw new Error("El email o contraseña no son válidos");
    const passwordSuccess = yield bcryptjs_1.default.compare(password, userFound.password);
    if (!passwordSuccess)
        throw new Error("El email o contraseña no son válidos");
    return {
        token: createToken(userFound, process.env.SECRET_KEY_LOGIN, "72h"),
    };
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        return users;
    }
    catch (error) {
        return null;
    }
});
const getUser = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        if (id)
            user = user_1.default.findOne({ _id: id });
        if (username)
            user = user_1.default.findOne({ username });
        if (!user)
            throw new Error("El usuario no existe");
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = {
    register,
    login,
    getUsers,
    getUser,
};
