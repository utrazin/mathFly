const express = require('express'); 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'mathfly.db'));

// Para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Rota para buscar várias perguntas aleatórias
app.get('/api/question/:difficulty/:count', (req, res) => {
    const difficulty = req.params.difficulty;
    const count = parseInt(req.params.count) || 1;
    console.log(`Dificuldade: ${difficulty}, Contagem: ${count}`); // Log de diagnóstico

    db.all(`SELECT * FROM questions_${difficulty} ORDER BY RANDOM() LIMIT ?`, [count], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar as perguntas.' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nenhuma pergunta encontrada.' });
        }
        res.json(rows);
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

// Redirecionamento da raiz para /nivel
app.get('/', (req, res) => {
    res.redirect('/nivel');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});