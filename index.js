const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

require('dotenv').config();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
}

connectToDatabase();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const { check, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport');
require('./passport');

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);



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
      description: 'A mind-bending science fiction thriller directed by Christopher Nolan.',
      genre: {
        name: 'Sci-Fi',
        description: 'Explore the realms of imagination and technology with these mind-bending science fiction films.'
      },
      director: {
        name: 'Christopher Nolan',
        bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
        birthYear: 1970,
        deathYear: null
      },
      actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      featured: false
    },
    {
      title: 'The Dark Knight',
      description: 'A gripping action-packed superhero film directed by Christopher Nolan.',
      genre: {
        name: 'Action',
        description: 'Experience thrilling action sequences and adrenaline-pumping excitement with these gripping action films.'
      },
      director: {
        name: 'Christopher Nolan',
        bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
        birthYear: 1970,
        deathYear: null
      },
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      featured: false
    },
    {
      title: 'Pulp Fiction',
      description: 'A nonlinear crime film directed by Quentin Tarantino.',
      genre: {
        name: 'Crime',
        description: 'Dive into the world of crime and suspense with these gripping and unpredictable crime films.'
      },
      director: {
        name: 'Quentin Tarantino',
        bio: 'Quentin Tarantino is an American filmmaker and screenwriter known for his nonlinear storytelling and stylized violence.',
        birthYear: 1963,
        deathYear: null
      },
      actors: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      featured: false
    },
    {
      title: 'Fight Club',
      description: 'An intense psychological drama directed by David Fincher.',
      genre: {
        name: 'Drama',
        description: 'Experience raw emotions and intense character studies with these powerful and thought-provoking dramas.'
      },
      director: {
        name: 'David Fincher',
        bio: 'David Fincher is an American filmmaker known for his dark and atmospheric storytelling.',
        birthYear: 1962,
        deathYear: null
      },
      actors: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
      imagePath: 'https://m.media-amazon.com/images/I/51iOANjtCQL._AC_UF894,1000_QL80_.jpg',
      featured: false
    },
    {
      title: 'The Shawshank Redemption',
      description: 'A powerful prison drama directed by Frank Darabont.',
      genre: {
        name: 'Drama',
        description: 'Experience raw emotions and intense character studies with these powerful and thought-provoking dramas.'
      },
      director: {
        name: 'Frank Darabont',
        bio: 'Frank Darabont is an American filmmaker and screenwriter known for his adaptations of Stephen King novels.',
        birthYear: 1959,
        deathYear: null
      },
      actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      imagePath: 'https://m.media-amazon.com/images/I/519NBNHX5BL._AC_UF894,1000_QL80_.jpg',
      featured: false
    },
    {
      title: 'The Godfather',
      description: 'An iconic crime film directed by Francis Ford Coppola.',
      genre: {
        name: 'Crime',
        description: 'Dive into the world of crime and suspense with these gripping and unpredictable crime films.'
      },
      director: {
        name: 'Francis Ford Coppola',
        bio: 'Francis Ford Coppola is an American filmmaker and screenwriter renowned for his contributions to the New Hollywood era.',
        birthYear: 1939,
        deathYear: null
      },
      actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR107,0,630,1200_AL_.jpg',
      featured: false
    },
    {
      title: 'The Matrix',
      description: 'A groundbreaking science fiction action film directed by The Wachowskis.',
      genre: {
        name: 'Sci-Fi',
        description: 'Explore the realms of imagination and technology with these mind-bending science fiction films.'
      },
      director: {
        name: 'The Wachowskis',
        bio: 'The Wachowskis are American filmmakers known for their innovative and visually stunning work.',
        birthYear: 1965,
        deathYear: null
      },
      actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      imagePath: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_UF894,1000_QL80_.jpg',
      featured: false
    },
    {
      title: 'Goodfellas',
      description: 'A gripping crime drama directed by Martin Scorsese.',
      genre: {
        name: 'Crime',
        description: 'Dive into the world of crime and suspense with these gripping and unpredictable crime films.'
      },
      director: {
        name: 'Martin Scorsese',
        bio: 'Martin Scorsese is an American filmmaker and screenwriter recognized for his explorations of the criminal underworld.',
        birthYear: 1942,
        deathYear: null
      },
      actors: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR85,0,630,1200_AL_.jpg',
      featured: false
    },
    {
      title: 'Interstellar',
      description: 'An epic space exploration film directed by Christopher Nolan.',
      genre: {
        name: 'Sci-Fi',
        description: 'Explore the realms of imagination and technology with these mind-bending science fiction films.'
      },
      director: {
        name: 'Christopher Nolan',
        bio: 'Christopher Nolan is a British-American filmmaker known for his distinctive and visually stunning films.',
        birthYear: 1970,
        deathYear: null
      },
      actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      imagePath: 'https://www.themoviedb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      featured: false
    },
    {
      title: 'The Avengers',
      description: 'A thrilling superhero ensemble film directed by Joss Whedon.',
      genre: {
        name: 'Action',
        description: 'Experience thrilling action sequences and adrenaline-pumping excitement with these gripping action films.'
      },
      director: {
        name: 'Joss Whedon',
        bio: 'Joss Whedon is an American filmmaker, screenwriter, and television producer known for his work in the superhero genre.',
        birthYear: 1964,
        deathYear: null
      },
      actors: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
      imagePath: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      featured: false
    }
  // Add more movie objects here
];


const genres = [
  {
    name: 'Sci-Fi',
    description: 'Explore the realms of imagination and technology with these mind-bending science fiction films.'
  },
  {
    name: 'Action',
    description: 'Experience thrilling action sequences and adrenaline-pumping excitement with these gripping action films.'
  },
  {
    name: 'Crime',
    description: 'Dive into the world of crime and suspense with these gripping and unpredictable crime films.'
  },
  {
    name: 'Drama',
    description: 'Experience raw emotions and intense character studies with these powerful and thought-provoking dramas.'
  }
  // Add more genres here
];



app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

/* Get All Movies */
app.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => {
      res.json(movies);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});


/* Get Movie By Title */
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  const requestedTitle = req.params.title.toLowerCase();
  
  Movies.findOne({ title: { $regex: new RegExp('^' + requestedTitle + '$', 'i') } }) // Use findOne() instead of find()

    .then(movie => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});


/*Get Genre Data*/
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  const requestedName = req.params.name.toLowerCase();

  const genre = genres.find(genre => genre.name.toLowerCase() === requestedName);
  if (genre) {
    const genreData = {
      name: genre.name,
      description: genre.description
    };
    res.json(genreData);
  } else {
    res.status(404).send('Genre not found');
  }
});


/*Get Director Data*/
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  const requestedName = req.params.name.toLowerCase();

  const movie = topMovies.find(movie => movie.director.name.toLowerCase() === requestedName);
  if (movie) {
    const director = movie.director;
    const directorData = {
      name: director.name,
      bio: director.bio,
      birthYear: director.birthYear,
      deathYear: director.deathYear
    };
    res.json(directorData);
  } else {
    res.status(404).send('Director not found');
  }
});


//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  const { username, password, email, birthday } = req.body;

  // Validation for username
  if (!username || !username.trim()) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  // Validation for password
  if (!password || !password.trim()) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  // Validation for email
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Validation for birthday
  if (!birthday || !Date.parse(birthday)) {
    return res.status(400).json({ error: 'Valid birthday is required.' });
  }

  // Create a new user object
  const hashedPassword = bcrypt.hashSync(password.trim(), 10);
  const newUser = {
    id: uuid.v4(),
    username: username.trim(),
    password: hashedPassword,
    email: email.trim(),
    birthday: new Date(birthday)
  };

  // Check if a user with the same username already exists
  const existingUser = users.find(user => user.username === newUser.username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists.' });
  }

  // Check if a user with the same email already exists
  const existingEmail = users.find(user => user.email === newUser.email);
  if (existingEmail) {
    return res.status(409).json({ error: 'Email already exists.' });
  }

  // Add the new user to the array of users
  users.push(newUser);

  // Send the response
  return res.status(201).json(newUser);
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const requestedUsername = req.params.Username.toLowerCase();

  Users.findOne({ username: { $regex: new RegExp('^' + requestedUsername + '$', 'i') } })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});


// Update a user's info, by username TEST
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
// Update a user by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { Username } = req.params;
  const { username, password, email, birthday } = req.body;

  Users.findOne({ username: Username })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }

      user.username = username;
      user.password = password;
      user.email = email;
      user.birthday = birthday;

      return user.save(); // Return the promise for chaining
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Add a movie to a user's list of favorites TEST
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  const username = new RegExp(`^${req.params.Username}$`, 'i'); // Case-insensitive username regex
  const movieID = req.params.MovieID;

  Users.findOneAndUpdate(
    { username: username }, // Updated field name to 'username'
    { $push: { favoriteMovies: movieID } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});



// Delete a movie from a user's list of favorites TEST
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  const username = new RegExp(`^${req.params.Username}$`, 'i'); // Case-insensitive username regex
  const movieID = req.params.MovieID;

  Users.findOneAndUpdate(
    { username: username }, // Updated field name to 'username'
    { $pull: { favoriteMovies: movieID } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Delete a user by username TEST
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const username = new RegExp(`^${req.params.Username}$`, 'i'); // Case-insensitive username regex

  Users.findOneAndRemove({ username: username }) // Updated field name to 'username'
    .then((user) => {
      if (!user) {
        res.status(404).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});