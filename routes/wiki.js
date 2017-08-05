//requires
const router = require('express').Router();
const models = require('../models');

//access models
const Page = models.Page;
const User = models.User;

//routes
router.get('/', (req, res, next) => {
  res.redirect('/');
});

//adding a page
router.post('/', (req, res, next) => {
  //check if user exists
  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email
    }
  })
  .then(function(result){
    let user = result[0];
    //build page
    let page = Page.build(req.body);
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function(page){
    res.redirect(page.route);
  })
  .catch(next);

});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findAll({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    console.log('here')
    res.locals.page = page[0].dataValues;
    return page[0].getAuthor();
  })
  .then(function(author){
    res.locals.author = author.dataValues;
    res.render('wikipage');

  })
  .catch(next);
});

//exports
module.exports = router;
