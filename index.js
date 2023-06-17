const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

app.get('/movies', (req, res) => {
  const topMovies = [
    { title: 'Inception', genre: 'Sci-Fi' },
    { title: 'The Dark Knight', genre: 'Action' },
    // ... remaining movie objects
  ];

  res.json(topMovies);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
