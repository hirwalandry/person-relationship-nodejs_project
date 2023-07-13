const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const childSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    SecondName: {
      type: String,
      required: true,
    },
    Mother: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Mother",
    },
    Father: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Father",
    },
    Age: {
      type: Number,
      min: 1,
      max: new Date().getFullYear(),
      required: true,
    },
  },
  { timestamps: true }
);

childSchema.pre("find", async function (next) {
  this.populate("Mother").populate("Father");
  next();
});
const Child = model("Child", childSchema);

module.exports = Child;
