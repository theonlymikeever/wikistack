//requires
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

//models
var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  }, {
      getterMethods: {
        route(){
          return '/wiki/' + this.title;
        }
      }
    }, {
      setterMethods: {
        //here
      }
    }
);

Page.hook('beforeValidate', (page, options) =>{
  //below line will automatically remove white spaces & non alpha-numeric!
  page.urlTitle =  page.title.replace(/ /g,'_').replace(/[^\w\d\s:]/g, '');
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false, validate: {
          isEmail: true
        }
    }
});


//exports
module.exports = {
  db,
  Page,
  User
};
