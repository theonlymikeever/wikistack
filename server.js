//requires
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const morgan = require('morgan');
const db = require('./db');

//app instance and config
const app = express();
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//middleware
app.use(morgan('tiny')); //logging
app.use(require('body-parser').urlencoded({ extended:false }));
app.use(require('method-override')('_method'));

//static routes


//port
const port = process.env.PORT || 3000;

app.listen(port, function(req, res, next){
  console.log(`listing on port ${port}`);
});
