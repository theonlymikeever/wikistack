//requires
const router = require('express').Router();
const models = require('../models');

//access models
const Page = models.Page;
const User = models.User;

//routes
router.get('/', (req, res, next) => {
  res.redirect('/')
});

router.post('/', (req, res, next) => {
  let page = Page.build({
    title: req.body.title,
    content: req.body.pageContent
  });

  page.save()
  .then(res.redirect('/'));
});

router.get('/add', (req, res, next) => {
  res.render('addpage');
});

//exports
module.exports = router;
