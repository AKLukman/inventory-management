const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// Schema design

const StockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
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
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },
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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please provide a brand name"],
        trim: true,
        enum: {
          values: [
            "dhaka",
            "sylhet",
            "rajshahi",
            "rangpur",
            "chottogram",
            "mymansingh",
            "khulna",
            "barishal",
          ],
          message: "{VALUE} is not defined",
        },
        lowercase: true,
      },
      id: {
        type: ObjectId,
        ref: "Store",
        required: true,
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide supplier name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Suppliers",
      },
    },
  },
  { timestamps: true }
);

// Model
const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;
