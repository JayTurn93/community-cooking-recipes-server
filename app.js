require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");


const app = express();
const PORT = process.env.PORT || "4000"
//-------------MIDDLEWARE---------------
app.use(helmet({contentSecurityPolicy: false}));
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
//------------SESSION MANAGEMENT----------

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: {
      httpOnly: true,
      secure: true, //change to true for deployment
      maxAge: 1000 * 60 * 60 * 24,
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
//Error Catch Middleware 
app.use((error, request, response, next) =>{
  const authErrorStatus = error.status || 400;
  const serverErrorStatus = error.status || 500;
  if (error.code === 11000) {
    return response.statuse(authErrorStatus).json({
      error: {message: "Already have an account? Try logging in."},
      statusCode: authErrorStatus,
    });
  }
  return response.status(serverErrorStatus).json({error: {messsge: error.message || "Internal server error."},
    statusCode: serverErrorStatus,
  })
});

app.get("/", (request, response, next) => {
    response.status(200).json({
        success: { message: "This route points to the Home page" },
        statusCode: 200,
      });
});

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

