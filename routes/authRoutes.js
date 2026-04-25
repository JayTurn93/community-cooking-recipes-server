const express = require("express");
const passport = require("passport");

const router = express.Router();

const { login, localLogin, logout, register } = require("../controllers/authController");

router.get("/", (request, response, next) => {
    return response.json("We are now accepting Chef enrollment.")
})
router.post("/register", register);
router.post("/login", 
    passport.authenticate("local", {
        failureRedirect: "/login/error",
        failureMessage: true,
      }),
 login);
router.post("/login/local", localLogin);

router.get("/login/error", (request, response, next) => {
    return response.status(400).json({
        message: "Login error"
    });
});
router.post("/logout", logout);
router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/");
});
router.get("/login/google", 
    passport.authenticate("google", {scope: 
        ["profile", "email"] })
);
router.get("/google/callback", 
    passport.authenticate("google", {
        failureRedirect: "/login", 
        successRedirect: "/admin"
    })
);

const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    }
    return response.status(403).redirect("/auth/unauthenticated");
};

router.get("/admin", checkAuthentication, (request, response, next) => {
    const userCopy = request.user.toObject();
    delete userCopy.password;
    return response.status(200).json({
        success: { message: "Welcome to the admin console." },
        data: { user: userCopy },
        statusCode: 200,
    });
});
router.get("/admin/auth-console", checkAuthentication, (request, response, next) => {
    return response.status(200).json({ message: "The user is authenticated within the auth console." });
});
router.get("/admin/unauthenticated", (request, response, next) => {
    response.redirect("/");
});
module.exports = router;