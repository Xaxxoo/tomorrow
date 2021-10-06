const sqlite = require('sqlite3').verbose();
const dbName = 'tomorrow.sqlite';
const db = new sqlite.Database(dbName);

db.serialize(() => {
  const sql = `CREATE TABLE IF NOT EXISTS articles
  (id integer primary key, title, content TEXT)
  `;
  db.run(sql);
});

class article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
  };

  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb);
  };
  
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
    db.run(sql, data.title, data.content, cb);
  };

  static delete(id, cb) {
    if (!id) return cb(new Error('Please Provide an id'));
    db.run('DELETE FROM articles WHERE id = ?', id, cb);
  };
}

module.exports = db;
module.exports.article = article;

