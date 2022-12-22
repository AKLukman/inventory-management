const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 charaters"],
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },

    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid phone number",
        },
      },
    ],

    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },

    tradeLicenceNumber: {
      type: String,
      required: [true, "Please provide your trade license number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "rajshahi",
          "sylhet",
          "khulna",
          "chattogram",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "{VALUE} is not correct division",
      },
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "please provid a valid url"],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, "please provid a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "discontinue"],
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
