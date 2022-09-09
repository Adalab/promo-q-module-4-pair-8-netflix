const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const db = new Database('./src/db/database.db', { verbose: console.log});

server.get("/movies", (req, resp) => {
  const query = db.prepare(
    `SELECT * 
    FROM movies` 
  )
  const allMovies = query.all();
  console.log(allMovies);
  resp.json({
    movies: allMovies,
    success: true
  });
})

server.set('view engine', 'ejs');

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const query = db.prepare(
    `SELECT * 
    FROM movies` 
  )
  const allMovies = query.all();
  const foundMovie = allMovies.find((oneMovie) => parseInt(oneMovie.id) === parseInt(req.params.movieId));
  console.log(foundMovie);

  res.render('movie', foundMovie);
})

//Login usuarias
server.post('/login', (req, res) => {
  console.log(req.body);
  const queryLogin = db.prepare(
    `SELECT * FROM users`
  )
  const allUsers = queryLogin.all();
  res.json({
    users: allUsers,
    success: true
  })
})

//Signup usuarias
server.post('/signup', (req, res) => {
  const querySignup = db.prepare(
    `INSERT INTO users (email, password) VALUES (?, ?)`
  )
  console.log(req.body);
  const newUser = querySignup.run(req.body.email, req.body.password)
  console.log(newUser);
  res.json(newUser);
})


const staticServer = ('./src/public-react');
server.use(express.static(staticServer));

const staticCSSServer = ('./src/public-css');
server.use(express.static(staticCSSServer));