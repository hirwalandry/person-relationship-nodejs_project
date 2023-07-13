const express = require("express");
const Mother = require("../models/mother");

const router = new express.Router();

router.post("/createMother", async (req, res) => {
  const mother = new Mother(req.body);
  await mother.save();
  res.send(mother);
});
router.get("/getMothers", async (req, res) => {
  const mothers = await Mother.find();
  res.send(mothers);
});

module.exports = router;
