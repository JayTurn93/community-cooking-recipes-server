const { request, response } = require("express");
const bcrypt = require("../models/userModel")

const register = async (request, response, next) => {
    const {firstName, lastName, userName, password} = request.body;
    console.log(firstName, lastName, userName, password);
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
            return next(error);
        }
        const newUser = new User({
            firstName,
            lastName,
            userName,
            password,
        });
        try {
            await newUser.save();
            request.login(newUser, (error) => {
                if (error) {
                    response.status(400).json({
                        error: {message: "Something went wrong signing in."},
                        statusCode: 400,
                    });
                }
            });
            response.status(201).json({
                success: {message: "Cooked up a new user."},
                data: {firstName, lastName, username},
                statusCode: 201
            });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.username) {
                response.status(400).json({
                    error: {message: "Username already exist."},
                    statusCode: 400,
                });
            } else {
              response.status(500).json({
              error: {message: "Internal server error"},
              statusCode: 500
             });
            }
        };
    });
};

const login = async (request, response, next) => {
    try {
        return response.status(200).json({
        success: {message: "Login Successfil"},
        statusCode: 200,
    });
    } catch (error) {
        return response.status(400).json({
            error: {message: "There was a problem logging in."},
            statusCode: 400
        });
    };
};

const localLogin = async (request, response, next) => {
    const result = true;

    function mockPassport(error, user) {
        if (error) {
            return next(error);
        }
    }
    mockPassport();
    return response.json({
        success: {message: "Login successful."}
    })
};

const logout = async (request, response, next) => {
    console.log("intializing logout controller");
    console.log("session destroyed");
    response.clearCookie("connect.sid");

    return response.status(200).json({
        success: {message: "User logged out."},
        statusCode: 200,
    });
    function sessionDestruction (error) {
        if (error) {
            return next(error);
        };
    sessionDestruction();
    console.log("logout function activated")
    };
};



module.exports = { register, logout, localLogin, login };