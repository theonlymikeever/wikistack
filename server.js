//requires
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pg = require('pg');
const models = require('./models/');
// const routers = require('./routes');

//app instance and config
const app = express();
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//middleware
app.use(morgan('tiny')); //logging
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(require('method-override')('_method'));
app.use('/', require('./routes/index'));

//static routes
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));


//port & index
const port = process.env.PORT || 3000;

app.get('/', function(req, res, next){
  res.render('index');
})

//sync
models.db.sync({force: true})
  .then(function(){
    app.listen(port, function(req, res, next){
      console.log(`listing on port ${port}`);
    })
  })
  .catch(console.error);


