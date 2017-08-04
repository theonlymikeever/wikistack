const router = require('express').Router();
const wiki = require('./wiki');
const users = require('./users');

//middleware
router.use('/wiki', wiki);
router.use('/users', users);


//exports
module.exports = router;
