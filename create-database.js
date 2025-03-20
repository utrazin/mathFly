const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados
const db = new sqlite3.Database('mathfly.db');

db.serialize(() => {
    // Criação das tabelas
    db.run(`CREATE TABLE IF NOT EXISTS questions_easy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_answer1 TEXT NOT NULL,
        wrong_answer2 TEXT NOT NULL,
        wrong_answer3 TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS questions_medium (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_answer1 TEXT NOT NULL,
        wrong_answer2 TEXT NOT NULL,
        wrong_answer3 TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS questions_hard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_answer1 TEXT NOT NULL,
        wrong_answer2 TEXT NOT NULL,
        wrong_answer3 TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS questions_expert (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_answer1 TEXT NOT NULL,
        wrong_answer2 TEXT NOT NULL,
        wrong_answer3 TEXT NOT NULL
    )`);

    // Inserção de questões fáceis
    const stmtEasy = db.prepare("INSERT INTO questions_easy (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtEasy.run('Quanto é 2 + 2?', '4', '3', '5', '6');
    stmtEasy.run('Quanto é 3 + 5?', '8', '7', '6', '9');
    stmtEasy.run('Quanto é 10 - 4?', '6', '5', '4', '7');
    stmtEasy.run('Quanto é 5 x 3?', '15', '12', '18', '20');
    stmtEasy.run('Quanto é 12 ÷ 4?', '3', '2', '4', '5');
    stmtEasy.run('Qual é 7 + 3?', '10', '9', '8', '11');
    stmtEasy.run('Quantos lados tem um quadrado?', '4', '3', '5', '6');
    stmtEasy.run('Quanto é 10 + 10?', '20', '15', '25', '30');
    stmtEasy.run('Qual é 5²?', '25', '20', '15', '30');
    stmtEasy.run('Qual é 8 - 3?', '5', '4', '6', '3');
    stmtEasy.run('Qual é a metade de 8?', '4', '3', '5', '2');
    stmtEasy.run('Quanto é 6 + 7?', '13', '12', '14', '15');
    stmtEasy.run('Quanto é 4 x 5?', '20', '15', '25', '30');
    stmtEasy.run('Qual é 100 - 37?', '63', '60', '70', '50');
    stmtEasy.run('Quanto é 15 ÷ 3?', '5', '4', '6', '7');
    stmtEasy.run('Quantos graus tem um triângulo retângulo?', '90', '80', '100', '70');
    stmtEasy.run('Qual é 9 + 1?', '10', '9', '11', '12');
    stmtEasy.run('Quanto é 20 ÷ 4?', '5', '4', '3', '2');
    stmtEasy.run('Qual é a soma de 0 + 5?', '5', '4', '3', '2');
    stmtEasy.run('Quanto é 10 - 2 + 1?', '9', '8', '7', '10');
    stmtEasy.finalize();

    // Inserção de questões médias
    const stmtMedium = db.prepare("INSERT INTO questions_medium (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtMedium.run('Quanto é 5 x 6?', '30', '24', '36', '25');
    stmtMedium.run('Qual é a raiz quadrada de 16?', '4', '2', '6', '8');
    stmtMedium.run('O que é 15% de 200?', '30', '20', '25', '40');
    stmtMedium.run('Quanto é 12 x 12?', '144', '142', '146', '140');
    stmtMedium.run('Qual é a soma de 1 + 2 + 3 + 4?', '10', '9', '11', '12');
    stmtMedium.run('Quanto é 45 - 18?', '27', '25', '30', '22');
    stmtMedium.run('Qual é a fórmula da área de um círculo?', 'πr²', '2πr', 'πd', '2r');
    stmtMedium.run('Quantas horas há em 3 dias?', '72', '48', '36', '24');
    stmtMedium.run('Qual é o valor de 9^2?', '81', '72', '90', '100');
    stmtMedium.run('Se x + 5 = 10, qual é x?', '5', '4', '6', '3');
    stmtMedium.run('Quantos lados tem um pentágono?', '5', '4', '6', '7');
    stmtMedium.run('O que é 8 x 7?', '56', '54', '58', '60');
    stmtMedium.run('Qual é a raiz quadrada de 25?', '5', '4', '6', '7');
    stmtMedium.run('Quanto é 3/4 + 1/4?', '1', '2', '0.5', '0.75');
    stmtMedium.run('Quantas maçãs há em 3 cestas com 6 maçãs cada?', '18', '15', '20', '12');
    stmtMedium.run('Qual é 20% de 50?', '10', '5', '15', '20');
    stmtMedium.run('Quanto é 60 ÷ 5?', '12', '10', '15', '8');
    stmtMedium.run('Qual é o próximo número na sequência 2, 4, 6, ?', '8', '10', '12', '14');
    stmtMedium.run('Se um carro anda 80 km/h, quanto ele anda em 2 horas?', '160 km', '120 km', '100 km', '80 km');
    stmtMedium.finalize();

    // Inserção de questões difíceis
    const stmtHard = db.prepare("INSERT INTO questions_hard (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtHard.run('Qual é a fórmula da água?', 'H2O', 'O2', 'CO2', 'H2O2');
    stmtHard.run('Qual é a capital da Austrália?', 'Canberra', 'Sydney', 'Melbourne', 'Brisbane');
    stmtHard.run('Quem desenvolveu a teoria da relatividade?', 'Einstein', 'Newton', 'Galileu', 'Tesla');
    stmtHard.run('Quanto é 15% de 250?', '37.5', '40', '35', '45');
    stmtHard.run('Qual é a soma dos ângulos internos de um triângulo?', '180', '90', '270', '360');
    stmtHard.run('Quanto é 7! (fatorial de 7)?', '5040', '720', '40320', '600');
    stmtHard.run('Qual é o valor de 2^5?', '32', '16', '64', '24');
    stmtHard.run('Quantos centímetros há em um metro?', '100', '50', '10', '1000');
    stmtHard.run('Qual é a fórmula da distância em uma reta?', 'd = rt', 'd = r^2', 'd = t/r', 'd = r+t');
    stmtHard.run('Qual é a soma de 1, 2, 3, 4 e 5?', '15', '10', '20', '25');
    stmtHard.run('Qual é o valor de 3x + 5 = 14 quando x = 3?', '14', '17', '11', '8');
    stmtHard.run('Qual é a média de 10, 20, 30?', '20', '15', '25', '18');
    stmtHard.run('O que é π (pi)?', 'Uma constante', 'Um número natural', 'Um inteiro', 'Um decimal');
    stmtHard.run('Qual é a área de um retângulo de 5m x 10m?', '50m²', '60m²', '40m²', '30m²');
    stmtHard.run('Quanto é 9 x 9 - 5?', '76', '71', '80', '75');
    stmtHard.run('Se um ângulo é 90 graus, ele é chamado de?', 'Retângulo', 'Agudo', 'Obtuso', 'Reto');
    stmtHard.run('Quantos segundos há em 1 hora?', '3600', '600', '1800', '1200');
    stmtHard.run('Qual é a fórmula da circunferência de um círculo?', '2πr', 'πd', 'r²', '2r');
    stmtHard.finalize();

    // Inserção de questões expert
    const stmtExpert = db.prepare("INSERT INTO questions_expert (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtExpert.run('Qual é o valor de pi?', '3.14', '3.16', '3.15', '3.13');
    stmtExpert.run('Quem escreveu "Dom Quixote"?', 'Cervantes', 'Shakespeare', 'Hemingway', 'Dickens');
    stmtExpert.run('O que é a teoria das cordas?', 'Uma teoria na física', 'Uma teoria na biologia', 'Uma teoria na química', 'Uma teoria na matemática');
    stmtExpert.run('Qual é a solução da equação x² - 4 = 0?', 'x = 2 ou x = -2', 'x = 4', 'x = -4', 'x = 0');
    stmtExpert.run('Quanto é 100 ÷ 5 + 10?', '30', '20', '25', '35');
    stmtExpert.run('Qual é a fórmula da soma dos ângulos internos de um polígono de n lados?', '(n-2) × 180', '(n+2) × 180', 'n × 180', '(n-3) × 180');
    stmtExpert.run('Qual é a derivada de x²?', '2x', 'x', 'x²', '2');
    stmtExpert.run('Qual é o logaritmo de 100?', '2', '10', '1', '100');
    stmtExpert.run('Qual é a média de 1, 4, 7, 10 e 13?', '7', '8', '6', '5');
    stmtExpert.run('Quantas raízes quadradas existem para um número negativo?', 'Nenhuma', 'Uma', 'Duas', 'Infinitas');
    stmtExpert.run('Se um triângulo tem lados de comprimento 3, 4 e 5, ele é um triângulo...', 'Retângulo', 'Equilátero', 'Isósceles', 'Escaleno');
    stmtExpert.run('Qual é a fórmula da área de um triângulo?', 'A = (base × altura) / 2', 'A = base + altura', 'A = base × altura', 'A = 2 × base + altura');
    stmtExpert.run('O que é 1 + 1 × 0?', '1', '2', '0', '10');
    stmtExpert.run('Se um carro viaja a 60 km/h, quantos quilômetros ele percorre em 2 horas?', '120 km', '100 km', '80 km', '60 km');
    stmtExpert.run('Qual é a fórmula para a soma de uma progressão aritmética?', 'S = (n/2)(a1 + an)', 'S = a1 + an', 'S = n × a1', 'S = (n-1)(a1 + an)');
    stmtExpert.run('Qual é a equação geral da reta?', 'y = mx + b', 'y = x² + b', 'y = ax² + b', 'y = a + bx');
    stmtExpert.run('Qual é o próximo número na sequência 2, 4, 8, 16, ...?', '32', '24', '20', '40');
    stmtExpert.run('Se a área de um quadrado é 25, qual é o comprimento do lado?', '5', '4', '6', '7');
    stmtExpert.finalize();

    console.log("Banco de dados e tabelas criados! Questões inseridas!");
});

db.close();