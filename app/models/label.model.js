const mongoose = require("mongoose");
const LabelSchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["brand", "banner"],
      default: "banner",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    link: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);
const LabelModel = mongoose.model("Label", LabelSchemaDef);
module.exports = LabelModel;
