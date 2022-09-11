const express = require('express');
const cors = require('cors');
const listMovies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", (req, resp) => {
  resp.json({
    success: true,
    movies: listMovies
  })
})

server.set('view engine', 'ejs');

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const foundMovie = listMovies.find((oneMovie) => parseInt(oneMovie.id) === parseInt(req.params.movieId));
  console.log(foundMovie);

  res.render('movie', foundMovie);
})

const staticServer = ('./src/public-react');
server.use(express.static(staticServer));

const staticServerImg = ('./src/public-movie-images');
server.use(express.static(staticServerImg));

const staticCSSServer = ('./src/public-css');
server.use(express.static(staticCSSServer));