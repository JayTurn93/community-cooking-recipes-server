const { request, response } = require("express");


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

const register = async (request, response, next) => {
    const {firstName, lastName, userName, password} = request.body;
    console.log(firstName, lastName, userName, password);

    try {
        const newUser = {
            firstName,
            lastName,
            userName,
            password,
        };
        console.log("We're cooking")
        response.status(201).json({
            success: {message: "Cooked up a new user."},
            data: {newUser},
            statusCode: 201
        });
    } catch (error) {
        response.status(500).json({
            error: {message: "Internal server error"},
            statusCode: 500
        });
    };
};

module.exports = { register, logout, localLogin, login };