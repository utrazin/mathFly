const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mathfly.db');

// Função para carregar uma pergunta aleatória
function loadQuestion(difficulty) {
    db.get(`SELECT * FROM questions_${difficulty} ORDER BY RANDOM() LIMIT 1`, (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row) {
            displayQuestion(row);
        } else {
            console.log('Nenhuma pergunta encontrada.');
        }
    });
}

// Função para exibir a pergunta na página
function displayQuestion(question) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>Fase 1</h2>
        <p>Resolva a questão abaixo:</p>
        <form id="question-form">
            <label for="questao">${question.question_text}</label>
            <input type="text" id="questao" name="questao" required />
            <button type="submit">Responder</button>
        </form>
    `;

    // Adiciona o evento para verificar a resposta
    const form = document.getElementById('question-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswer = document.getElementById('questao').value;
        if (userAnswer === question.correct_answer) {
            alert('Resposta correta!');
        } else {
            alert('Resposta incorreta! A resposta correta é: ' + question.correct_answer);
        }
    });
}

// Carregar uma pergunta aleatória ao abrir a página
loadQuestion('easy'); // Substitua 'easy' pela dificuldade desejada (easy, medium, hard, expert)
