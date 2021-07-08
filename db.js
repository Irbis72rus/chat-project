const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


db.serialize(function() {

  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL);');  

  db.run('INSERT INTO users(id, name, phone) VALUES(?, ?, ?)', [1, 'Raiko', '2323232'], (err) => {
    if (err) {
      return console.log(err.message); 
    }
    console.log(`Row was added to the table: ${this.id}`);
  })



  db.each('SELECT id, name, phone FROM users', function(err, row) {
    console.log(row.id + ': ' + row.name);
  });
});

db.close();


