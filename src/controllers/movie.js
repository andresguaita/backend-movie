
const { response } = require('express');
const { Op } = require('sequelize')
const { Movie, Category } = require('../db')

const createMovie = async (req, res) => {
  const {
    title,
    description,
    duration,
    rdate,
    img,
    trailer,
    categories,
  } = req.body;

  try {
    if (title, description, duration, rdate, img, trailer) {
      const movie = await Movie.create({ title, description, duration, rdate, img, trailer })
      categories.map((category) => movie.addCategory(category))
      res.json({
        ok: true,
        movie
      })
    }

    else {
      res.status(400).json({
        ok: false,
        msg: 'Debe completar todos los datos obligatorios'
      })
    }

  } catch (error) {
    console.log(error);
  }
};

const getAllMovies = async (req, res) => {

  try {

    const movies = await Movie.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          }
        }
      ]
    })

    res.json({
      ok: true,
      movies
    })

  } catch (error) {
    console.log(error);
  }
};

const updateRate = async (req, res = response) => {

  const { id } = req.params
  const { rate } = req.body

  try {

    await Movie.update({
      rate: rate
    },
      {
        where:
          { id: id }
      });

      res.json({
        ok: true,
        msg: 'Calificacion Actualizada'
      }) 

  } catch (error) {
    console.log(error)
  }
}

const updateView = async (req, res = response) => {

  const { id } = req.params
  const { view } = req.body

  try {

    await Movie.update({
      view: view
    },
      {
        where:
          { id: id }
      });

   res.json({
     ok: true,
     msg: 'View Actualizado'
   }) 

  } catch (error) {
    console.log(error)
  }
}

const getMovieByTitle= async( req, res=response) =>{
  const {title} = req.query
  
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          }
        }
      ],
      where : {
         title: {
            [Op.iLike] : `%${title}%`
             }
         }
     })
  if(movies.length===0){
      return res.status(404).json({
          ok:false,
          msg: `No se encontro una pelicula con el titulo ${title}`
      })
  }

  
    return res.json({
      ok: true,
      movies
    })
  
  
  } catch (error) {
    
  }
}

const getmovieById= async( req, res= response) => {

  const {id} = req.params
  try {
      
      const movie = await Movie.findByPk(id.toUpperCase(),{
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: {
              attributes: [],
            }
          }
        ],
      })
      if(!movie){
          
          return res.status(404).json({
              ok:false,
              msg: `No hay una pelicula con el id ${id}`
          })
      }
      res.json({
          ok:true,
          movie
      })

  } catch (error) {

      console.log(error)
      
  }
}



module.exports = { createMovie, getAllMovies,updateRate, updateView,getMovieByTitle,getmovieById }