const cors = require("cors");
const express = require("express");
const knex = require("knex");

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
    host: '127.0.0.1',
    user: 'postgres',
    password: 'post',
    database: 'face-model-storage',
  }
});

app.get("/", (req, res) => {
  res.send("https://github.com/harshcut/face-model-api");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
