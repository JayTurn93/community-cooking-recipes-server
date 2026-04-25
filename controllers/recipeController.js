const Recipe = require("../models/recipeModel");

const getAllRecipes = async (request, response, next) => {
  try {
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
    const recipe = await Recipe.findById(_id);
    if (!recipe) {
      return response.status(404).json({
        error: { message: "Recipe not found." },
        statusCode: 404,
      });
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
      return response.status(400).json({
        error: { message: "Please enter missing fields." },
        statusCode: 400,
      });
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
      return response.status(400).json({
        error: { message: "Please enter the missing fields." },
        statusCode: 400,
      });
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
    if (!updatedRecipe) {
      throw new Error("Recipe not updated.");
    }

    return response.status(200).json({
      success: { message: "Updated recipe successfully" },
      data: { updatedRecipe },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteRecipe = async (request, response, next) => {
  const { _id } = request.params;

  try {
    const recipe = await Recipe.findByIdAndDelete(_id);

    if (!recipe) {
      return response.status(404).json({
        error: { message: "Recipe not found." },
        statusCode: 404,
      });
    }

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
