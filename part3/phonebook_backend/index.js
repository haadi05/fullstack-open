require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person.js");

// middlewares
app.use(express.static("dist"));
app.use(express.json());

morgan.token("person", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :person"),
);

// routes
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      res.json(person);
    })
    .catch((error) => next(error));
});

app.get("/info", async (req, res) => {
  const persons = await Person.find({});
  const size = persons.length;
  const date = new Date().toString();

  res.send(`
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
    `);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "missing Name" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "missing Number" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => res.json(savedPerson));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.get("/", (req, res) => {
  res.send("Phonebook");
});

// error handling

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
