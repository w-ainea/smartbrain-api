const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {
  users: [
    {
      id: 123,
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: "ainea",
      email: "ainea@gmail.com",
      password: "ainea",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db.users.push({
    id: 125,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(db.users[db.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
