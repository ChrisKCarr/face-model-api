const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "post",
    database: "face-model-storage",
  },
});

app.post("/register", (req, res) => {
  register(req, res, database, bcrypt);
});

app.post("/signin", (req, res) => {
  signin(req, res, database, bcrypt);
});

app.get("/", (req, res) => {
  res.send("https://github.com/harshcut/face-model-api");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
