const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname))); // Para servir arquivos estáticos

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'fase.html')); // Substitua pelo nome do seu arquivo HTML
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});