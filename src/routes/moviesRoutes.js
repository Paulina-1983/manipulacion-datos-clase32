const express = require('express');
const router = express.Router();
const {list,nueva,recomended,detail,add,create,edit,update,remove,destroy} = require('../controllers/moviesController');

router
     .get('/', list)
     .get('/new', nueva)
     .get('/recommended',recomended)
     .get('/detail/:id',detail)

     .get('/add',add)
     .post('/create',create)
     .get('/edit/:id',edit)
     .put('/update/:id',update)
     .get('/remove/:id',remove)
     .delete('/delete/:id',destroy)

module.exports = router;