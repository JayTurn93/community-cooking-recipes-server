const express = require("express");
const passport = require("passport");

const router = express.Router();

const { login, localLogin, logout, register } = require("../controllers/authController");

router.post("/register", register);
router.post("/login/local", localLogin);
router.post("/login", 
    passport.authenticate("local", {
        failureRedirect: "/login/error",
        failureMessage: true,
      }),
    login);
router.get("/login/error", (request, response, next) => {
    return response.status(400).json({
        message: "Login error"
    });
});
router.post("/logout", logout);
router.get("/unauthenticated", (request, response, next) => {
    console.log("Returning to homepage");
    response.redirect("/");
});
router.get("/login/google", passport.authenticate("google", {scope: ["profile", "email"] })
);
router.get("/login/callback", passport.authenticate("google", {failureRedirect: "/login", successRedirect: "/dashboard"})
);
module.exports = router;