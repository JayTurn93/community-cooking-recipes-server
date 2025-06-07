const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema ({
    name: {
      type: String,
      required: true,
      trim: true,
    }, 
    prepTime: {
      type: String,
      required: true,
      trim: true,
    }, 
    cookTime: {
      type: String,
      required: true,
      trim: true,
    }, 
    ingredients: {
      type: String,
      required: true,
      trim: true,
    }, 
    instructions: {
      type: String,
      required: true,
      trim: true,
    }, 
    notes: {
      type: String,
    },
    
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;