const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados
const db = new sqlite3.Database('mathfly.db');

// Cria a tabela de questões
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        answer TEXT NOT NULL,
        difficulty TEXT CHECK(difficulty IN ('fácil', 'médio', 'difícil', 'extremo')) NOT NULL,
        options TEXT
    )`);
    
    console.log("Banco de dados e tabela criados!");
});

db.close();