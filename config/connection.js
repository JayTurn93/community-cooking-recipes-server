const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected.");
  } catch (error) {
    console.log(`There was an error connectiong to the database ${error}`);
  };
};

main();