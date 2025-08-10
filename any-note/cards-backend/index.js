const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let cards = [];

app.get("/", (req, res) => {
  res.send("Welcome to the Cards backend!");
});

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }

  const newCard = {
    id: Date.now(),
    title,
    description,
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
