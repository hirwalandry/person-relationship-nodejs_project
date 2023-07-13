const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const motherRouter = require("./router/mother");
const fatherRouter = require("./router/father");
const childRouter = require("./router/child");
const app = express();

const PORT = process.env.PORT || 2003;

app.use(cors({ orgin: "https://www.section.io" }));
app.use(express.json());
app.use(motherRouter);
app.use(fatherRouter);
app.use(childRouter);
app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
