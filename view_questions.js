const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mathfly.db');

db.all("SELECT * FROM questions_easy", (err, rows) => {
    if (err) throw err;
    console.log("Questões fáceis:", rows);
});

db.all("SELECT * FROM questions_medium", (err, rows) => {
    if (err) throw err;
    console.log("Questões médias:", rows);
});

db.all("SELECT * FROM questions_hard", (err, rows) => {
    if (err) throw err;
    console.log("Questões difíceis:", rows);
});

db.all("SELECT * FROM questions_expert", (err, rows) => {
    if (err) throw err;
    console.log("Questões expert:", rows);
});

db.close();