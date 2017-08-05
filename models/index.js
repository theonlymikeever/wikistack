//requires
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

//models
const Page = db.define('page', {
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
          return '/wiki/' + this.urlTitle;
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
  //else random string
  page.urlTitle = page.title ?
    page.title.replace(/ /g,'_').replace(/[^\w\d\s:]/g, '') :
    Math.random().toString(36).substring(2, 7);
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false, validate: {
          isEmail: true
        }
    }
});

//associations
Page.belongsTo(User, { as: 'author' });

//exports
module.exports = {
  db,
  Page,
  User
};
