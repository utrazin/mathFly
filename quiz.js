// Função para carregar uma pergunta aleatória
function loadQuestion(difficulty) {
    fetch(`/api/question/${difficulty}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a pergunta.');
            }
            return response.json();
        })
        .then(question => displayQuestion(question))
        .catch(error => console.error(error));
}

// Função para exibir a pergunta na página
function displayQuestion(question) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>${getDifficultyTitle()}</h2>
        <p>Resolva a questão abaixo:</p>
        <form id="question-form">
            <label for="questao">${question.question_text}</label><br>
            <input type="radio" id="correct" name="questao" value="${question.correct_answer}" required>
            <label for="correct">${question.correct_answer}</label><br>
            <input type="radio" id="wrong1" name="questao" value="${question.wrong_answer1}">
            <label for="wrong1">${question.wrong_answer1}</label><br>
            <input type="radio" id="wrong2" name="questao" value="${question.wrong_answer2}">
            <label for="wrong2">${question.wrong_answer2}</label><br>
            <input type="radio" id="wrong3" name="questao" value="${question.wrong_answer3}">
            <label for="wrong3">${question.wrong_answer3}</label><br>
            <button type="submit">Responder</button>
        </form>
    `;

    // Adiciona o evento para verificar a resposta
    const form = document.getElementById('question-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswer = form.questao.value; // Captura a resposta escolhida
        if (userAnswer === question.correct_answer) {
            alert('Resposta correta!');
        } else {
            alert('Resposta incorreta! A resposta correta é: ' + question.correct_answer + "! Você errou");
        }
    });
}

// Função para obter o título da dificuldade com base no arquivo atual
function getDifficultyTitle() {
    return 'Fácil'; // Como estamos chamando o nível fácil diretamente
}

// Carregar uma pergunta aleatória ao abrir a página
loadQuestion('easy'); // Chama a função para carregar a pergunta