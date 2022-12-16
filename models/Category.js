const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Please provide a unique category name"],
      required: [true, "Please provide a category name"],
      lowercase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
