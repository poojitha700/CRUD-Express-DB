//?write database schema
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema, model } = require("mongoose");
const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//module.exports = mongoose.model("posts", PostSchema);
module.exports = model("posts", PostSchema);
