const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Child = require("./child");

const motherSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    SecondName: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      min: 0,
      max: new Date().getFullYear(),
      required: true,
    },
  },
  { timestamps: true }
);
motherSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    //here a was using post
    // console.log(doc)

    // if(doc){
    //     const deleteResult = await Child.deleteMany({ Father: doc._id })
    //     console.log('child has deleted', deleteResult)
    // }
    const deleteResult = await Child.deleteMany({
      Mother: this.getFilter()["_id"],
    });
    console.log("child has delete", deleteResult);

    next();
  }
);
motherSchema.post("remove", async function (docs) {
  console.log(docs);

  const deleteMothers = await Child.deleteMany({ Mother: { $in: docs._id } });
  console.log("delete mothers", deleteMothers);
  next();
});
const Mother = model("Mother", motherSchema);
module.exports = Mother;
