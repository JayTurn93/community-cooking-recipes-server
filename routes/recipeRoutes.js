const express = require("express");
const router = express.Router();
const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeController");

router.get("/", getAllRecipes);
router.get("/:id", getRecipe);
router.post("/create/new", createRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id");

module.exports = router;