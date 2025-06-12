let questions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;

// Função para carregar perguntas aleatórias
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestions() {
    const difficulty = getDifficultyFromURL();
    fetch(`/api/question/${difficulty}/5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar as perguntas.');
            }
            return response.json();
        })
        .then(loadedQuestions => {
            questions = loadedQuestions;
            shuffle(questions); // Embaralha as questões
            displayQuestion();
        })
        .catch(error => console.error(error));
}

// Função para exibir a pergunta atual na página
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const answers = [
        question.correct_answer,
        question.wrong_answer1,
        question.wrong_answer2,
        question.wrong_answer3
    ];
    shuffle(answers); // Embaralha as alternativas

    const contentDiv = document.getElementById('content');
    const questionNumber = currentQuestionIndex + 1; // Número da questão (1 a 5)

    contentDiv.innerHTML = `
        <h2>${getDifficultyTitle()} - Questão ${questionNumber}</h2> <!-- Título com número da questão -->
        <p>Resolva a questão abaixo:</p>
        <form id="question-form">
            <div class="question">
                <label class="question-label" for="questao">${question.question_text}</label>
            </div>
            <div class="answers-grid">
            ${answers.map((answer, index) => `
                <label class="answer-option" for="answer${index}">
                <input type="radio" id="answer${index}" name="questao" value="${answer}" required>
                ${answer}
                </label>
            `).join('')}
            </div>
            <button type="submit" class="button-resposta marginTop">Responder</button>
        </form>
        <button id="exit-quiz" class="button-exit marginTop">Sair do Quiz</button> <!-- Botão de sair -->
    `;

    const form = document.getElementById('question-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswer = form.questao.value;
        if (userAnswer === question.correct_answer) {
            correctAnswersCount++;
            alert('Resposta correta!');
        } else {
            alert('Resposta incorreta! A resposta correta é: ' + question.correct_answer + "! Você errou");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    });

    // Adiciona o evento para o botão "Sair do Quiz"
    const exitButton = document.getElementById('exit-quiz');
    exitButton.addEventListener('click', () => {
        const confirmExit = confirm("Tem certeza que deseja sair desse quiz?");
        if (confirmExit) {
            goToMenu(); // Redireciona para a página de fases
        }
    });
}

// Função para finalizar o quiz e exibir o resultado
function endQuiz() {
    const totalQuestions = questions.length;
    
    // Obtém o progresso atual
    let progress = JSON.parse(localStorage.getItem('quizProgress')) || { easy: true, medium: false, hard: false, expert: false };

    // Se acertou 3 ou mais, libera a próxima fase
    if (correctAnswersCount >= 3) {
        if (getDifficultyFromURL() === 'easy') progress.medium = true;
        if (getDifficultyFromURL() === 'medium') progress.hard = true;
        if (getDifficultyFromURL() === 'hard') progress.expert = true;
    }

    const maxStars = 5;
    let starsHTML = '';
    for (let i = 0; i < maxStars; i++) {
        if (i < correctAnswersCount) {
            starsHTML += '<span class="star full">★</span>'; // Estrela cheia
        } else {
            starsHTML += '<span class="star empty">☆</span>'; // Estrela vazia
        }
    }

    // Salva o progresso no LocalStorage
    localStorage.setItem('quizProgress', JSON.stringify(progress));

    // Exibe o resultado final com as estrelas **acima** do número de acertos
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>Quiz Finalizado!</h2>
        <div class="stars-container">${starsHTML}</div> <!-- Estrelas acima -->
        <p>Você acertou ${correctAnswersCount} de ${totalQuestions} perguntas.</p>
        <button class="suporte-button marginTop" onclick="restartQuiz()">Reiniciar Quiz</button>
        <button class="suporte-button marginTop" onclick="goToMenu()">Voltar ao Menu</button>
    `;
}

// Função voltar por menu
function goToMenu() {
    window.location.href = 'fases.html'; // Altere para o caminho correto do seu menu
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    loadQuestions();
}

// Função para obter o título da dificuldade com base no arquivo atual
function getDifficultyTitle() {
    const difficulty = getDifficultyFromURL();
    const titles = {
        'easy': 'Fácil',
        'medium': 'Médio',
        'hard': 'Difícil',
        'expert': 'Expert'
    };
    return titles[difficulty] || 'Desconhecido';
}

// Função para obter a dificuldade com base na URL
function getDifficultyFromURL() {
    const path = window.location.pathname;
    if (path.includes('nivel_2')) return 'medium';
    if (path.includes('nivel_3')) return 'hard';
    if (path.includes('nivel_4')) return 'expert';
    return 'easy';
}

// Carregar perguntas ao abrir a página
loadQuestions();