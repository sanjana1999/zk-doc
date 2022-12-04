require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const Router = require("./src/routes");

app.use(express.json());
app.use(cors());

Router.init(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${process.env.PORT}`);
});
