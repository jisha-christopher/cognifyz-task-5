const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let users = [];
let idCounter = 1;

// CREATE
app.post('/api/users', (req, res) => {
  const user = { id: idCounter++, name: req.body.name };
  users.push(user);
  res.json(user);
});

// READ
app.get('/api/users', (req, res) => {
  res.json(users);
});

// UPDATE
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
