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
    console.log("Returning to homepage");
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
    if (!response.result) {
        return next();
    } else if (response.ok && !request.isAuthenticated()) {
        response.json("WARNING: USER IS NOT AUTHENTICATED").redirect(403, "/unauthenticated")
    }
}

router.get("/admin", checkAuthentication, (request, response, next) => {
    console.log("Passed Admin Route, Assessing user authentication..");
    try {
        if(localLogin.call(response.result)) {
            function auth() {
                console.log("Auth Successful in admin console")
                console.log("Redirecting to webmaster route - http//:localhost3000/auth/admin/auth-console")
                response.json("Authenticated via route").redirect("/auth-console")
            }
            auth()
        }
    } catch (error) {
        response.redirect("/unauthenticated")
    }
});
router.get("/admin/auth-console", (request, response, next) => {
    response.json("The user is authenticated within the auth console.")
});
router.get("/admin/unauthenticated", (request, response, next) => {
    console.log("Returning to homepage..")
    response.redirect("/")
});
module.exports = router;