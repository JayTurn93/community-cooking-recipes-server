// const recipeData = require("../data/recipes");
const Recipe = require("../models/recipeModel");

const getAllRecipes = async (request, response, next) => {
  try {
    // const recipes = recipeData;
    const recipes = await Recipe.find({});
    return response.status(200).json({
      success: { message: "This route shows all the recipes." },
      data: { recipes },
    });
  } catch (error) {
    return next(error);
  }
};

const getRecipe = async (request, response, next) => {
  const { _id } = request.params;

  try {
    // const foundRecipe = recipeData.find((recipe) => recipe.id === id);
    if (!_id) {
      throw new Error("ID required.");
    }
    const recipe = await Recipe.findById(_id);
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    return response.status(200).json({
      success: { message: "Found recipe by ID" },
      data: { recipe },
    });
  } catch (error) {
    return next(error);
  }
};

const createRecipe = async (request, response, next) => {
  const { name, prepTime, cookTime, ingredients, instructions, notes } =
    request.body;

  try {
    if (!name || !prepTime || !cookTime || !ingredients || !instructions) {
      throw new Error("Please enter missing fields.");
    }
    const newRecipe = new Recipe({
      name,
      prepTime,
      cookTime,
      ingredients,
      instructions,
      notes,
    });
    await newRecipe.save();
    return response.status(201).json({
      success: { message: "Cooked up a new recipe!" },
      data: { newRecipe },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const updateRecipe = async (request, response, next) => {
  const { _id } = request.params;
  const { name, prepTime, cookTime, ingredients, instructions, notes } =
    request.body;

  try {
    if (!name || !prepTime || !cookTime || !ingredients || !instructions) {
      throw new Error("Please enter the missing fields.");
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          prepTime,
          cookTime,
          ingredients,
          instructions,
          notes,
        },
      },
      { new: true }
    );
    if (!upatedRecipe) {
      throw new Error("Recipe not updated.");
    }

    return response.status(201).json({
      success: { message: "Updated recipe successsfully" },
      data: { updatedRecipe },
    });
  } catch (error) {
    return new error();
  }
};

const deleteRecipe = async (request, response, next) => {
  const { _id } = request.params;

  try {
    if (!_id) {
      throw new Error("ID required.");
    }
    // const recipe = recipeData.filter((recipe) => recipe.id !== id)
    const recipe = await Recipe.findByIdAndDelete(_id);

    return response.status(200).json({
      success: { message: "The recipe has been chopped." },
      data: { recipe },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
