const sql = require("sqlite");
const config = require('../config.json');

sql.open(config.currencyDBName);

module.exports = {
  getAll: function() {
    return sql.all("SELECT * FROM currency_list order by rowid desc").then(row => {
      if (!row) {
        return console.log("no data");
      } else {
        return row;
      }
    });
  },
  count: function() {
    return sql.get(`SELECT count(*) as countAll FROM currency_list`).then(row => {
      if (!row) {
        return console.log("no data");
      } else {
        return row.countAll;
      }
    });
  },
  getOne: function() {
    return sql.get(`SELECT * FROM currency_list order by rowid desc limit 1`).then(row => {
      if (!row) {
        return console.log("no data");
      } else {
        return row;
      }
    });
  },
  insert: function(values) {
    return sql.run("INSERT INTO currency_list (date_time, usd, jpy, aud, sgd, thb, twd, cny) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values).then(row => {
        return row.lastID;
    });
  },
  drop: function() {
    sql.run("Drop table currency_list").then(() => {});
  },
  create: function() {
    sql.run("CREATE TABLE IF NOT EXISTS currency_list (date_time text, usd INTEGER, jpy INTEGER, aud INTEGER, sgd INTEGER, thb INTEGER, twd INTEGER, cny INTEGER)").then(() => {});
  }

}; // end of module.exports
