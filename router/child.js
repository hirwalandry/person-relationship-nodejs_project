const express = require("express");
const Child = require("../models/child");
const Mother = require("../models/mother");
const Father = require("../models/father");
const router = new express.Router();

router.get("/getChilds", async (req, res) => {
  const child = await Child.find({});
  res.send(child);
});

router.post("/createChild", async (req, res) => {
  const mother = await Mother.findById(req.body.motherId);
  if (!mother) return res.status(400).send();

  const father = await Father.findById(req.body.fatherId);
  if (!father) return res.status(400).send();
  const child = new Child({
    FirstName: req.body.firstname,
    SecondName: req.body.secondname,
    Mother: {
      _id: mother._id,
      FirstName: mother.FirstName,
      SecondName: mother.SecondName,
      Age: mother.Age,
    },
    Father: {
      _id: father._id,
      FirstName: father.FirstName,
      SecondName: father.SecondName,
      Age: father.Age,
    },
    Age: req.body.age,
  });
  await child.save();
  res.send(child);
});

router.get("/getChilds", async (req, res) => {
  const child = await Child.find({}).select("-__v");
  res.send(child);
});

router.get("/getChild/:id", async (req, res) => {
  const child = await Child.findOne({ _id: req.params.id });
  res.send(child);
});
router.delete("/deleteChild/:id", async (req, res) => {
  const child = await Child.deleteOne({ _id: req.params.id });
  res.send(child);
});
module.exports = router;
