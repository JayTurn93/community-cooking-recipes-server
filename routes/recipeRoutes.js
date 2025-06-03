const express = require("express");
const router = express.Router();
const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeController");

router.get("/", getAllRecipes);
router.get("/:_id", getRecipe);
router.post("/create/new", createRecipe);
router.put("/update/:_id", updateRecipe);
router.delete("/delete/:_id", deleteRecipe);

module.exports = router;