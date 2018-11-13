//  SETUP 
const myArgs = process.argv[2]; //  take in arguments from the CLI
const pg = require('pg');
const moment = require('moment'); //  required moment to display date as displayed in example
const settings = require('./settings.json');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//  OUTPUT FUNCTION

function dbQuery(err) {
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE '${myArgs}'`, (err, result) => { //  this will query the db and takes in the myArgs
    if (err) {
      return console.error('error running query', err);
    }
    const queryResults = result.rows;
    queryResults.forEach((entry, index) => { // to display the results a certain way
      console.log(`- ${index + 1}: ${entry.first_name} ${entry.last_name} born '${moment(entry.birthdate).format('YYYY-MM-DD')}'`);
    });
    client.end();
  });
}


//  INPUT FUNCTION

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  dbQuery();
});


/* ORIGINAL COMBINED FUNCTION

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE '${myArgs}'`, (err, result) => { //  this will query the db and takes in the myArgs
    if (err) {
      return console.error('error running query', err);
    }
    const queryResults = result.rows;
    queryResults.forEach((entry, index) => { // to display the results a certain way
      console.log(`- ${index + 1}: ${entry.first_name} ${entry.last_name} born '${moment(entry.birthdate).format('YYYY-MM-DD')}'`);
    });
    client.end();
  });
});

*/
