const express = require('express'); 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('mathfly.db');

// Para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Rota para buscar uma pergunta aleatória
// Rota para buscar uma pergunta aleatória
app.get('/api/question/:difficulty', (req, res) => {
    const difficulty = req.params.difficulty;

    db.get(`SELECT * FROM questions_${difficulty} ORDER BY RANDOM() LIMIT 1`, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar a pergunta.' });
        }
        res.json(row);
    });
});

// Rota para carregar o arquivo HTML de acordo com a dificuldade
app.get('/nivel', (req, res) => {
    res.sendFile(path.join(__dirname, 'nivel.html')); // Fácil
});

app.get('/nivel_2', (req, res) => {
    res.sendFile(path.join(__dirname, 'nivel_2.html')); // Médio
});

app.get('/nivel_3', (req, res) => {
    res.sendFile(path.join(__dirname, 'nivel_3.html')); // Difícil
});

app.get('/nivel_4', (req, res) => {
    res.sendFile(path.join(__dirname, 'nivel_4.html')); // Extremo
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});