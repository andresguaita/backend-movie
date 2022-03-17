const express = require('express');
const { createMovie, getAllMovies, updateRate, updateView, getMovieByTitle, getmovieById } = require('../controllers/movie');
const router = express.Router()



router.get('/movies/all', getAllMovies );
router.get('/movies/name', getMovieByTitle );
router.get('/movie/:id', getmovieById)
router.post('/movies/create', createMovie );
router.put('/movie/rate/:id',updateRate );
router.put('/movie/view/:id',updateView );

module.exports = router
