// Update with your config settings.

const settings = require('./settings.json');

module.exports = {

  development: {
    client: 'pg',
    connection: settings, // used variable 'settings' which specifies this object
  },

};

/* SAMPLE FOR KNEXFILE.

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});

*/