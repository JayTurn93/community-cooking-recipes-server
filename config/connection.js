const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected.");
  } catch (error) {
    console.error(`There was an error connecting to the database ${error}`);
    process.exit(1);
  }
}

main();
