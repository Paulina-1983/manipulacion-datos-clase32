const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'nueva': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: (req, res) => {
        return res.render('moviesAdd')
    },
    create: (req,res) => {

        const {title,rating,awards,release_date,length} = req.body;

        db.Movie.create({
            title:title.trim(),
            rating,
            awards,
            release_date,
            length
        })
        .then (movie => {
            console.log(movie)
            res.redirect('/movies/detail/' + movie.id)
        })
        .catch(error => console.log(error))
    },
    edit: (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then(Movie => res.render('moviesEdit',{
            Movie
        }))
        .catch(error => console.log(error))
    },
    update: (req,res) => {
      db.Movie.update(
          {
              ...req.body
          },
        {
            where : {
                id : req.params.id
            }
        }
      )
       .then(() => {
        res.redirect('/movies/detail/' + req.params.id)
    })
       .catch(error => console.log(error))
    },
    remove: (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then(Movie => res.render('moviesDelete',{
            Movie
        }))
        
        .catch(error => console.log(error))
    },
    destroy: (req, res) => {
        db.Movie.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => res.redirect('/movies'))
        .catch(error => console.log(error))
    }

}

module.exports = moviesController;