const config = require('../config.json');
var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: config.currencyDBName
  }
});

module.exports = {
  testGetOne: function() {
  return knex.select('*')
  .from('currency_list')
  .orderBy('rowid', 'desc')
  .then(row => {
    if (!row) {
      return console.log("no data");
    } else {
      return row;
    }
  })
  .catch(function(error) { console.error(error); });
  }
};
