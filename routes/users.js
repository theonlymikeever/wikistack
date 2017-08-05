const router = require('express').Router();
const models = require('../models');

//access models
const User = models.User;
const Page = models.Page;

router.get('/', (req, res, next) => {
  User.findAll({})
  .then(function(users){
    res.render('users', { users });
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  let foundUser = User.findAll({
    where: {
      id: req.params.id
    }
  });
  let foundPages = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  Promise.all([foundUser, foundPages])
  .then(function(result){
    res.render('singleUser', { user: result[0], pages: result[1] });
  })
  .catch(next);
});

//exports
module.exports = router;
