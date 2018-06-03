const config = require('../config.json');
var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: config.currencyDBName
  }
});

module.exports = {
  getOneResult: function() {
    return knex.select('*')
    .from('currency_list')
    .orderBy('rowid', 'desc')
    .first()
    .then(row => {
      if (!row) {
        console.log("no data");
      } else {
        return row;
      }
    })
    .catch(function(error) { console.error(error); });
  },

  insert: function(arrValues, tableName) {
    return knex(tableName).returning('lastID').insert(arrValues);
  }
};
