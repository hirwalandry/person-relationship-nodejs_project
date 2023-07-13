const express = require("express");
const Father = require("../models/father");
const assert = require("assert");
const mongoose = require("mongoose");
const router = new express.Router();

router.post("/createFather", async (req, res) => {
  const father = new Father(req.body);
  await father.save();
  res.send(father);
});
router.get("/getFathers", async (req, res) => {
  const fathers = await Father.find();
  res.send(fathers);
});
router.patch("/updateFather/:id", async (req, res) => {
  const father = await Father.updateOne({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.send(father);
});
router.delete("/deleteFather/:id", async (req, res) => {
  const father = await Father.deleteOne({ _id: req.params.id });
  res.send(father);
});
router.delete("/deleteFather", async (req, res) => {
  //problem in deletiing many for middleware(cascading)
  let father = await Father.find();
  await father[0].deleteMany();

  res.send(father);
});
module.exports = router;
