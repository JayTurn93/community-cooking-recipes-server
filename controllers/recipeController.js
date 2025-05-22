const recipeData = require("../data/recipes");

const getAllRecipes = async (request, response, next) => {
    try {
        const recipes = recipeData;
        return response.status(200).json({
            success: {message: "This route shows all the recipes."},
            data: {recipes: recipes},
            statusCode: 200,
        })
    } catch (error) {
        return response.status(400).json({
            error: {message: "There was a problem retrieving the recipes."}
        });
    };
    
};

const getRecipe = async (request, response, next) => {
    const {id} = request.params;

    try {
        const foundRecipe = recipeData.find((recipe) => recipe.id === id);
        return response.status(200).json({
            success: {message: "This page shows recipe by ID"},
            data: {data: foundRecipe},
            statusCode: 200,
        })
    } catch (erro) {
        response.status(400).json({
            error: {message: "Error locating book by ID"},
            statusCode: 400,
        });
    };
};

const createRecipe = async (request, response, next) => {
    const {name, prepTime, cookTime, ingredients, instructions, notes} = request.body;
    const newRecipe = {
        name, 
        prepTime, 
        cookTime, 
        ingredients, 
        instructions, 
        notes,
    }
    try {
        return response.status(201).json({
            success: {message: "Cooked up a new recipe!"},
            data: {newRecipe},
            statusCode: 201,
        })
    } catch (error) {
        return response.status(400).json({
            error: {message: "There was a problem creating a new recipe."},
            statusCode: 400,
        });
    };
};

const updateRecipe = async (request, response, next) => {
    const {id} = request.params;
    const {name, prepTime, cookTime, ingredients, instructions, notes} = request.body;

    try {
        const updatedRecipe = {
        name,
        prepTime,
        cookTime,
        ingredients,
        instructions,
        notes,
    }
        return response.status(201).json({
            success: {message: "Updated recipe successsfully"},
            data: {updatedRecipe},
            statusCode: 201,
    })
    } catch (error) {
        return response.status(400).json({
            error: {message: "There was a problem updating recipe "},
            statusCode: 400,
        });
    };
};

const deleteRecipe = async(response, response, next) => {
    const {id} = request.params;

    try {
        const recipe = recipeData.filter((recipe) => recipe.id !== id)

        return response.status(200).json({
            success: {message: "The recipe has been chopped."},
            data: {recipe},
            statusCode: 200,
        })
    } catch (error) {
        return response.status(400).json({
            error: {message: "There was a problem deleting the recipe."},
            statusCode: 400,
        })
    }
}

module.exports = { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };