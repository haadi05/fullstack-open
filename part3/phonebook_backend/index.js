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
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  const size = Person.length;
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

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.get("/", (req, res) => {
  res.send("Phonebook");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
