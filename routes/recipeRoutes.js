const express = require("express");
const router = express.Router();
const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeController");

const isAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) return next();
  return response.status(401).json({ error: { message: "Authentication required." }, statusCode: 401 });
};

router.get("/", getAllRecipes);
router.get("/:_id", getRecipe);
router.post("/create/new", isAuthenticated, createRecipe);
router.put("/update/:_id", isAuthenticated, updateRecipe);
router.delete("/delete/:_id", isAuthenticated, deleteRecipe);

module.exports = router;