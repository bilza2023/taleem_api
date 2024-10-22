const express = require('express');
const path = require('path');

const app = express();
const database = require('./server/database');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
// Dummy data array
const items = [
  { name: 'Apple', price: 30 },
  { name: 'Banana', price: 10 },
  { name: 'Orange', price: 20 }
];
app.get('/', (req, res) => {
  res.render('home', { items });
});

app.get('/summary', (req, res) => {
  res.status(200).json({ "message": "Summary" });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});