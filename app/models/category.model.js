const mongoose = require("mongoose");
const CategorySchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    status: {
      type: String,
      enum: ["active", "inactive "],
      default: "inactive",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    brands: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Label",
      },
    ],
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: null,
    },
    show_in_home: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: false,
  }
);

const CategoryModel = mongoose.model("category", CategorySchemaDef);
module.exports = CategoryModel;
