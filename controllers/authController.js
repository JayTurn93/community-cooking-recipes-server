const { request, response } = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (request, response, next) => {
  const { firstName, lastName, username, password, googleId } = request.body;
  if (!firstName || !username || !password) {
    return response.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      googleId: googleId,
    });

    await newUser.save();

    request.login(newUser, (error) => {
      if (error) {
        return next(error);
      }

      newUser.password = undefined;

      return response.status(201).json({
        success: { message: "Cooked up a new user." },
        data: { user: newUser },
        statusCode: 201,
      });
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (request, response, next) => {
  response.status(200).json({
    success: { message: "User logged in." },
  });
};

const localLogin = async (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return response.status(401).json({
        error: { message: "There is no user detected. Try again" },
      });
    }
    request.login(user, (error) => {
      if (error) {
        return next(error);
      }
      const userCopy = { ...request.user._doc };
      userCopy.password = undefined;
      response.status(200).json({
        success: { message: "Local Login Served!" },
        data: { user: userCopy },
        statusCode: 200,
      });
    });
  });
};

const logout = async (request, response, next) => {
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    request.session.destroy((error) => {
      if (error) {
        return next(error);
      }
    });
    response.clearCookie("connect.sid");
    return response.status(200).json({
      success: { message: "User logged out!" },
      statusCode: 200,
    });
  });
};

module.exports = { register, logout, localLogin, login };
