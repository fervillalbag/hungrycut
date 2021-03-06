const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user, SECRET_KEY, expiresIn) => {
  const { id, name, username, email } = user;

  const payload = { id, name, username, email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const register = async (input) => {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  newUser.role = "user";

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ya está en uso");

  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El email ya está en uso");

  if (
    username === "category" ||
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
    username === "search"
  )
    throw new Error("El username ingresado no está en permitido");

  const salt = bcrypt.genSaltSync(10);
  newUser.password = await bcrypt.hash(password, salt);

  try {
    const user = new User(newUser);
    await user.save();

    return {
      message: "Usuario registrado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ha ocurrido un error al registrarse",
      success: false,
    };
  }
};

const login = async (input) => {
  const { email, password } = input;

  const userFound = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!userFound)
    throw new Error("El email o contraseña no son válidos");

  const passwordSuccess = await bcrypt.compare(
    password,
    userFound.password
  );

  if (!passwordSuccess)
    throw new Error("El email o contraseña no son válidos");

  return {
    token: createToken(
      userFound,
      process.env.SECRET_KEY_LOGIN,
      "72h"
    ),
  };
};

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    return null;
  }
};

const getUser = async (id, username) => {
  try {
    let user;
    if (id) user = User.findOne({ _id: id });
    if (username) user = User.findOne({ username });

    if (!user) throw new Error("El usuario no existe");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
};
