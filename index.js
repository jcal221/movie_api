const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

let users = [
  {
  id: uuid.v4(),
  username: 'john_doe',
  email: 'john.doe@example.com',
  password: 'password123'
},
{
  id: uuid.v4(),
  username: 'jane_smith',
  email: 'jane.smith@example.com',
  password: 'password456'
},
{
  id: uuid.v4(),
  username: 'mike_johnson',
  email: 'mike.johnson@example.com',
  password: 'password789'
},
{
  id: uuid.v4(),
  username: 'sara_wilson',
  email: 'sara.wilson@example.com',
  password: 'passwordabc'
},
{
  id: uuid.v4(),
  username: 'alex_brown',
  email: 'alex.brown@example.com',
  password: 'passworddef'
}
];

const topMovies = [
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    description: 'A mind-bending science fiction thriller directed by Christopher Nolan.',
    director: 'Christopher Nolan',
    directorInfo: {
      bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
      birthYear: 1970,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    description: 'A gripping action-packed superhero film directed by Christopher Nolan.',
    director: 'Christopher Nolan',
    directorInfo: {
      bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
      birthYear: 1970,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg'
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime',
    description: 'A nonlinear crime film directed by Quentin Tarantino.',
    director: 'Quentin Tarantino',
    directorInfo: {
      bio: 'Quentin Tarantino is an American filmmaker and screenwriter known for his nonlinear storytelling and stylized violence.',
      birthYear: 1963,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    title: 'Fight Club',
    genre: 'Drama',
    description: 'An intense psychological drama directed by David Fincher.',
    director: 'David Fincher',
    directorInfo: {
      bio: 'David Fincher is an American filmmaker known for his dark and atmospheric storytelling.',
      birthYear: 1962,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/I/51iOANjtCQL._AC_UF894,1000_QL80_.jpg'
  },
  {
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    description: 'A powerful prison drama directed by Frank Darabont.',
    director: 'Frank Darabont',
    directorInfo: {
      bio: 'Frank Darabont is an American filmmaker and screenwriter known for his adaptations of Stephen King novels.',
      birthYear: 1959,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/I/519NBNHX5BL._AC_UF894,1000_QL80_.jpg'
  },
  {
    title: 'The Godfather',
    genre: 'Crime',
    description: 'An iconic crime film directed by Francis Ford Coppola.',
    director: 'Francis Ford Coppola',
    directorInfo: {
      bio: 'Francis Ford Coppola is an American filmmaker and screenwriter renowned for his contributions to the New Hollywood era.',
      birthYear: 1939,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR107,0,630,1200_AL_.jpg'
  },
  {
    title: 'The Matrix',
    genre: 'Sci-Fi',
    description: 'A groundbreaking science fiction action film directed by The Wachowskis.',
    director: 'The Wachowskis',
    directorInfo: {
      bio: 'The Wachowskis are American filmmakers known for their innovative and visually stunning work.',
      birthYear: null,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_UF894,1000_QL80_.jpg'
  },
  {
    title: 'Goodfellas',
    genre: 'Crime',
    description: 'A gripping crime drama directed by Martin Scorsese.',
    director: 'Martin Scorsese',
    directorInfo: {
      bio: 'Martin Scorsese is an American filmmaker and screenwriter recognized for his explorations of the criminal underworld.',
      birthYear: 1942,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR85,0,630,1200_AL_.jpg'
  },
  {
    title: 'Interstellar',
    genre: 'Sci-Fi',
    description: 'An epic space exploration film directed by Christopher Nolan.',
    director: 'Christopher Nolan',
    directorInfo: {
      bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
      birthYear: 1970,
      deathYear: null
    },
    imageUrl: 'https://www.themoviedb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
  },
  {
    title: 'The Avengers',
    genre: 'Action',
    description: 'A thrilling superhero ensemble film directed by Joss Whedon.',
    director: 'Joss Whedon',
    directorInfo: {
      bio: 'Joss Whedon is an American filmmaker, screenwriter, and television producer known for his work in the superhero genre.',
      birthYear: 1964,
      deathYear: null
    },
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY1200_CR90,0,630,1200_AL_.jpg'
  }
  // Add more movie objects here
];

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/movies/:title', (req, res) => {
  const requestedTitle = req.params.title.toLowerCase(); // Convert the title parameter to lowercase
  const foundMovie = topMovies.find(movie => movie.title.toLowerCase() === requestedTitle);

  if (foundMovie) {
    res.json(foundMovie);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.get('/genres/:name', (req, res) => {
  const requestedGenre = req.params.name;
  const moviesWithGenre = topMovies.filter(movie => movie.genre.toLowerCase() === requestedGenre.toLowerCase());

  if (moviesWithGenre.length > 0) {
    res.json(moviesWithGenre);
  } else {
    res.status(404).send('No movies found with the specified genre');
  }
});

app.get('/directors/:name', (req, res) => {
  const requestedDirector = req.params.name;
  const moviesByDirector = topMovies.filter(movie => movie.director.toLowerCase() === requestedDirector.toLowerCase());

  if (moviesByDirector.length > 0) {
    res.json(moviesByDirector);
  } else {
    res.status(404).send('No movies found directed by the specified director');
  }
});

app.post('/users/register', (req, res) => {
  let newUser = req.body;

  if (!newUser.username || !newUser.email || !newUser.password) {
    const message = 'Missing required fields in request body';
    res.status(400).send(message);
  } else {
    // Proceed with registration logic
    newUser.id = uuid.v4(); // Generating a unique ID using uuid.v4()
    users.push(newUser); // Storing the new user data in the users database
    res.status(201).send('User registration successful');
  }
});

app.put('/users/:userId', (req, res) => {
  const username = req.params.userId; // Update the variable name to reflect username
  const updatedUsername = req.body.username;

  // Find the user with the corresponding username in the user database or data structure
  const user = users.find((user) => user.username === username);

  if (!user) {
    // If the user is not found, send an appropriate error response
    res.status(404).send('User not found');
  } else {
    // Update the user's username with the new value
    user.username = updatedUsername;

    // Send a response indicating the successful update
    res.send('User information updated');
  }
});

// Remaining routes...

// app.post('/users/:userId/favorites', (req, res) => {
//   const userId = req.params.userId;
//   // Logic to add a movie to a user's list of favorites
//   // Return text indicating the successful addition of the movie to the user's favorites
//   res.send(`Movie added to favorites for user with ID: ${userId}`);
// });

// app.delete('/users/:userId/favorites/:movieId', (req, res) => {
//   const userId = req.params.userId;
//   const movieId = req.params.movieId;
//   // Logic to remove a movie from a user's list of favorites
//   // Return text indicating the successful removal of the movie from the user's favorites
//   res.send(`Movie removed from favorites for user with ID: ${userId}`);
// });

// app.delete('/users/:userId', (req, res) => {
//   const userId = req.params.userId;
//   // Logic to deregister an existing user
//   // Return text indicating the successful deregistration of the user
//   res.send(`User deregistered with ID: ${userId}`);
// });


// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
