const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Child = require("./child");
var preHookWasCalled = false;

const fatherSchema = new Schema(
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
fatherSchema.pre(
  "updateOne",
  { document: false, query: true },
  async function (next) {
    const updateResult = await Child.updateMany({
      Father: this.getFilter()["_id"],
    });
    console.log("child has update", updateResult);

    next();
  }
);
fatherSchema.pre(
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
      Father: this.getFilter()["_id"],
    });
    console.log("child has delete", deleteResult);

    next();
  }
);
fatherSchema.post("remove", async function (docs) {
  console.log(docs);

  const deleteFathers = await Child.deleteMany({ Father: { $in: docs._id } });
  console.log("delete fathers", deleteFathers);
  next();
});

const Father = model("Father", fatherSchema);
module.exports = Father;
