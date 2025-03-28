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
    stmtEasy.run('Qual é a soma de 5 + 3?', '8', '7', '6', '9');
    stmtEasy.run('Qual é o resultado de 12 - 4?', '8', '10', '9', '7');
    stmtEasy.run('Quanto é 3 × 6?', '18', '15', '20', '21');
    stmtEasy.run('O que é 20 ÷ 4?', '5', '4', '6', '7');
    stmtEasy.run('Qual fração é equivalente a 1/2?', '4/8', '2/3', '3/4', '5/6');
    stmtEasy.run('Qual é o perímetro de um quadrado com lados de 4 cm?', '16 cm', '12 cm', '14 cm', '18 cm');
    stmtEasy.run('O que é 25% de 200?', '50', '25', '75', '100');
    stmtEasy.run('Qual é a média de 4, 6 e 8?', '6', '5', '7', '8');
    stmtEasy.run('Qual é a forma decimal de 3/4?', '0.75', '0.25', '0.50', '1.00');
    stmtEasy.run('Se um triângulo tem lados de 3 cm, 4 cm e 5 cm, qual é o tipo de triângulo?', 'Retângulo', 'Equilátero', 'Isósceles', 'Escaleno');
    stmtEasy.run('O que é 10 + 15 - 5?', '25', '20', '30', '15');
    stmtEasy.run('Quantos graus tem um ângulo reto?', '90', '45', '120', '180');
    stmtEasy.run('Se eu tenho 3 maçãs e ganho mais 2, quantas maçãs eu tenho?', '5', '3', '4', '6');
    stmtEasy.run('Qual é o próximo número na sequência: 2, 4, 6, ...?', '8', '7', '9', '10');
    stmtEasy.run('O que é 15 ÷ 3?', '5', '3', '7', '9');
    stmtEasy.run('Qual é a forma fracionária de 0,5?', '1/2', '1/4', '3/4', '2/5');
    stmtEasy.run('Se um retângulo tem 5 cm de largura e 10 cm de comprimento, qual é a área?', '50 cm²', '30 cm²', '60 cm²', '70 cm²');
    stmtEasy.run('Quanto é 9 + 10?', '19', '18', '20', '21');
    stmtEasy.run('Se eu tenho 10 reais e gasto 4, quanto eu tenho agora?', '6 reais', '4 reais', '5 reais', '7 reais');
    stmtEasy.run('O que é 1/10 em porcentagem?', '10%', '5%', '15%', '20%');
    stmtEasy.finalize();

    // Inserção de questões médias
    const stmtMedium = db.prepare("INSERT INTO questions_medium (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtMedium.run('Qual é a solução da equação 2x + 4 = 10?', '2', '3', '4', '5');
    stmtMedium.run('Qual é a porcentagem de 50 em relação a 200?', '25%', '10%', '20%', '50%');
    stmtMedium.run('Qual é o resultado de 5²?', '25', '10', '15', '30');
    stmtMedium.run('Resolva: 3x - 7 = 5', '4', '2', '5', '6');
    stmtMedium.run('O que é a média aritmética dos números 2, 4, 6, 8?', '4', '5', '6', '7');
    stmtMedium.run('Se um triângulo tem ângulos de 60° e 90°, qual é o terceiro ângulo?', '30°', '60°', '90°', '120°');
    stmtMedium.run('Qual é a raiz quadrada de 144?', '12', '10', '14', '16');
    stmtMedium.run('O que é 15% × 200?', '30', '20', '25', '35');
    stmtMedium.run('Resolva a equação x/3 + 5 = 11.', '15', '12', '18', '21');
    stmtMedium.run('Qual é o resultado de 7 + 3 × 2?', '13', '10', '16', '20');
    stmtMedium.run('Se uma pizza é dividida em 8 fatias e você come 3, quantas fatias restam?', '5', '3', '4', '6');
    stmtMedium.run('Qual é a fórmula da área de um círculo?', 'A = πr²', 'A = 2πr', 'A = πd', 'A = r²');
    stmtMedium.run('Se um carro viaja a 60 km/h, quanto tempo leva para percorrer 180 km?', '2 horas', '3 horas', '4 horas', '5 horas');
    stmtMedium.run('Qual é a forma decimal de 7/10?', '0.7', '0.5', '0.9', '1.0');
    stmtMedium.run('Resolva: x² - 9 = 0', '-3 e 3', '-9 e 9', '0 e 9', '0 e -9');
    stmtMedium.run('Se a soma de dois números é 10 e um deles é 4, qual é o outro número?', '6', '5', '7', '8');
    stmtMedium.run('Qual é a distância entre os pontos (2, 3) e (5, 7)?', '5', '4', '6', '7');
    stmtMedium.run('Qual é o próximo número na sequência: 3, 6, 9, ...?', '12', '10', '11', '13');
    stmtMedium.run('O que é 100 - 25% de 100?', '75', '50', '25', '100');
    stmtMedium.run('Se um número é multiplicado por 4 e o resultado é 32, qual é o número?', '8', '6', '7', '9');
    stmtMedium.finalize();

    // Inserção de questões difíceis
    const stmtHard = db.prepare("INSERT INTO questions_hard (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtHard.run('Qual é a solução da equação 2x² - 8 = 0?', '2', '4', '-2', '-4');
    stmtHard.run('Se f(x) = 3x + 5, qual é o valor de f(2)?', '11', '8', '10', '9');
    stmtHard.run('Resolva a equação 3x + 2 = 2x + 5.', '1', '2', '3', '4');
    stmtHard.run('Qual é o valor de 2³ + 3²?', '17', '9', '19', '21');
    stmtHard.run('Qual é a área de um triângulo com base de 10 cm e altura de 5 cm?', '25 cm²', '30 cm²', '50 cm²', '15 cm²');
    stmtHard.run('Se x² - 4x + 4 = 0, qual é a solução?', '2', '4', '0', '-2');
    stmtHard.run('O que é a soma dos ângulos internos de um triângulo?', '180°', '360°', '90°', '270°');
    stmtHard.run('Se g(x) = 4x² - 16, qual é o valor de g(3)?', '36', '12', '32', '20');
    stmtHard.run('Resolva a equação x² + 6x + 8 = 0.', '-2 e -4', '2 e 4', '-4 e -6', '4 e 6');
    stmtHard.run('O que é x³ - 27 = 0?', '3', '2', '1', '4');
    stmtHard.run('Qual é a raiz quadrada de 225?', '15', '12', '18', '20');
    stmtHard.run('Qual é a média ponderada de 70 (peso 2) e 80 (peso 3)?', '76', '74', '78', '80');
    stmtHard.run('Se um carro percorre 150 km em 2 horas, qual é a sua velocidade média?', '60 km/h', '70 km/h', '75 km/h', '80 km/h');
    stmtHard.run('Qual é a função inversa de f(x) = 2x + 3?', 'f⁻¹(x) = (x - 3)/2', 'f⁻¹(x) = 2x - 3', 'f⁻¹(x) = (x + 3)/2', 'f⁻¹(x) = x + 3');
    stmtHard.run('Qual é a solução da equação 5(x - 2) = 3(x + 1)?', '3', '1', '5', '7');
    stmtHard.run('Qual é o volume de um cubo com aresta de 4 cm?', '64 cm³', '16 cm³', '24 cm³', '32 cm³');
    stmtHard.run('Qual é o resultado de 9!/7!?', '72', '90', '63', '45');
    stmtHard.run('O que é 2 + 3 × (8 - 2)?', '20', '18', '22', '24');
    stmtHard.run('Se um ângulo é suplementar a 70°, qual é seu valor?', '110°', '90°', '80°', '100°');
    stmtHard.run('Qual é o logaritmo de 100 na base 10?', '2', '1', '3', '4');
    stmtHard.finalize();

    // Inserção de questões expert
    const stmtExpert = db.prepare("INSERT INTO questions_expert (question_text, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES (?, ?, ?, ?, ?)");
    stmtExpert.run('Qual é a solução da equação x² - 5x + 6 = 0?', '2 e 3', '1 e 6', '3 e 4', '5 e 6');
    stmtExpert.run('Qual é a derivada de f(x) = 3x² + 5x - 2?', '6x + 5', '3x + 5', '5x + 3', '3x²');
    stmtExpert.run('O que é a integral definida de f(x) = x² de 0 a 3?', '9', '6', '12', '18');
    stmtExpert.run('Se f(x) = ln(x), qual é o valor de f(e)?', '1', '0', 'e', '2');
    stmtExpert.run('Qual é a solução da equação 2x + 1 = 16?', '4', '2', '3', '5');
    stmtExpert.run('Qual é a soma dos zeros da função quadrática f(x) = x² - 4x + 3?', '4', '2', '3', '5');
    stmtExpert.run('Qual é o valor de sin(90°)?', '1', '0', '0.5', '-1');
    stmtExpert.run('O que é o determinante da matriz (1 2; 3 4)?', '2', '0', '-2', '4');
    stmtExpert.run('Qual é a solução da equação e^x = 5?', 'x = ln(5)', 'x = 5', 'x = 2', 'x = e');
    stmtExpert.run('Se f(x) = x³ - 3x + 2, quantos zeros reais essa função possui?', '3', '1', '2', '0');
    stmtExpert.run('Qual é o valor de cos(60°)?', '0.5', '0.7', '1', '0.25');
    stmtExpert.run('O que é a média geométrica de 4 e 16?', '8', '10', '12', '14');
    stmtExpert.run('Qual é a fórmula do teorema de Pitágoras?', 'a² + b² = c²', 'a + b = c', 'a² - b² = c²', 'ab = c');
    stmtExpert.run('Se x² + 4x + 4 = 0, qual é o discriminante?', '0', '4', '8', '16');
    stmtExpert.run('Qual é a soma das raízes da função quadrática 2x² + 8x + 6 = 0?', '-4', '-6', '-8', '-2');
    stmtExpert.run('Qual é a integral indefinida de f(x) = 6x?', '3x² + C', '6x² + C', 'x² + C', '12x + C');
    stmtExpert.run('Se x = 1/2, qual é o valor de 4x² - 4x + 1?', '0', '1', '2', '3');
    stmtExpert.run('Qual é a série de Taylor de e^x em torno de 0?', '∑ n=0 ∞ (xⁿ/n!)', '∑ n=0 ∞ (xⁿ/2n!)', '∑ n=0 ∞ (n!xⁿ)', '∑ n=0 ∞ (nxⁿ)');
    stmtExpert.run('Qual é a função inversa de f(x) = 1/x?', 'f⁻¹(x) = x', 'f⁻¹(x) = 1/x²', 'f⁻¹(x) = x²', 'f⁻¹(x) = x³');
    stmtExpert.run('Qual é a raiz cúbica de 27?', '3', '2', '4', '5');
    stmtExpert.finalize();

    console.log("Banco de dados e tabelas criados! Questões inseridas!");
});

db.close();