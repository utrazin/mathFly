const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mathfly.db');

db.serialize(() => {
    db.run("DELETE FROM questions_easy");
    db.run("DELETE FROM questions_medium");
    db.run("DELETE FROM questions_hard");
    db.run("DELETE FROM questions_expert");

    db.run("DELETE FROM sqlite_sequence WHERE name='questions_easy'");
    db.run("DELETE FROM sqlite_sequence WHERE name='questions_medium'");
    db.run("DELETE FROM sqlite_sequence WHERE name='questions_hard'");
    db.run("DELETE FROM sqlite_sequence WHERE name='questions_expert'");
    
    console.log("Todas as questões foram excluídas e IDs resetados!");
});

db.close();