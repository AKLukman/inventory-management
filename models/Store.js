const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const StoreSchema = mongoose.Schema(
  {
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
    description: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "Users",
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
exports = Store;
