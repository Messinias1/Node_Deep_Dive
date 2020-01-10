const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const authenticator = require("./authenticator");
const app = express();

app.use(express.json());

app.use(logger);
app.use(authenticator);

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

app.get("/", (req, res) => {
  res.send(genres);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
