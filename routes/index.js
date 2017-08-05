const router = require('express').Router();
const wiki = require('./wiki');
const users = require('./users');
const models = require('../models');

//access models
const Page = models.Page;

//middleware
router.use('/wiki', wiki);
router.use('/users', users);

//routes
router.get('/', (req, res, next) => {
  Page.findAll()
  .then(function(result){
    res.locals.pages = result;
    res.render('index');
  })
  .catch(next);
})


//exports
module.exports = router;
