const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// Schema design

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      // trim extra space remove kore
      trim: true,
      unique: [true, "Name must be unique"],
      minLenght: [3, "Name must be at least 3 characters"],
      maxLenght: [100, "Name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,

      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE} must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }

            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
