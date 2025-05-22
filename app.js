const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = 8080

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

app.get("/", (request, response, next) => {
    response.status(200).json({
        success: { message: "This route points to the Home page" },
        statusCode: 200,
      });
});
app.use("/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

