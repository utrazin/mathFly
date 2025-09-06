// Dados mockados para funcionar no Netlify
const mockQuestions = {
    easy: [
        { 
            id: 1, 
            question_text: "2 + 2 = ?", 
            correct_answer: "4", 
            wrong_answer1: "3", 
            wrong_answer2: "5", 
            wrong_answer3: "6" 
        },
        { 
            id: 2, 
            question_text: "5 - 3 = ?", 
            correct_answer: "2", 
            wrong_answer1: "1", 
            wrong_answer2: "3", 
            wrong_answer3: "4" 
        },
        { 
            id: 3, 
            question_text: "3 × 2 = ?", 
            correct_answer: "6", 
            wrong_answer1: "5", 
            wrong_answer2: "7", 
            wrong_answer3: "8" 
        },
        { 
            id: 4, 
            question_text: "8 ÷ 2 = ?", 
            correct_answer: "4", 
            wrong_answer1: "3", 
            wrong_answer2: "5", 
            wrong_answer3: "6" 
        },
        { 
            id: 5, 
            question_text: "1 + 1 = ?", 
            correct_answer: "2", 
            wrong_answer1: "1", 
            wrong_answer2: "3", 
            wrong_answer3: "0" 
        }
    ],
    medium: [
        { 
            id: 1, 
            question_text: "12 + 8 = ?", 
            correct_answer: "20", 
            wrong_answer1: "18", 
            wrong_answer2: "22", 
            wrong_answer3: "24" 
        },
        { 
            id: 2, 
            question_text: "15 - 7 = ?", 
            correct_answer: "8", 
            wrong_answer1: "6", 
            wrong_answer2: "7", 
            wrong_answer3: "9" 
        },
        { 
            id: 3, 
            question_text: "4 × 5 = ?", 
            correct_answer: "20", 
            wrong_answer1: "18", 
            wrong_answer2: "22", 
            wrong_answer3: "24" 
        },
        { 
            id: 4, 
            question_text: "24 ÷ 3 = ?", 
            correct_answer: "8", 
            wrong_answer1: "6", 
            wrong_answer2: "7", 
            wrong_answer3: "9" 
        },
        { 
            id: 5, 
            question_text: "9 + 6 = ?", 
            correct_answer: "15", 
            wrong_answer1: "13", 
            wrong_answer2: "14", 
            wrong_answer3: "16" 
        }
    ],
    hard: [
        { 
            id: 1, 
            question_text: "25 + 17 = ?", 
            correct_answer: "42", 
            wrong_answer1: "40", 
            wrong_answer2: "44", 
            wrong_answer3: "46" 
        },
        { 
            id: 2, 
            question_text: "48 - 19 = ?", 
            correct_answer: "29", 
            wrong_answer1: "27", 
            wrong_answer2: "31", 
            wrong_answer3: "33" 
        },
        { 
            id: 3, 
            question_text: "7 × 8 = ?", 
            correct_answer: "56", 
            wrong_answer1: "54", 
            wrong_answer2: "58", 
            wrong_answer3: "60" 
        },
        { 
            id: 4, 
            question_text: "63 ÷ 7 = ?", 
            correct_answer: "9", 
            wrong_answer1: "7", 
            wrong_answer2: "8", 
            wrong_answer3: "10" 
        },
        { 
            id: 5, 
            question_text: "36 + 14 = ?", 
            correct_answer: "50", 
            wrong_answer1: "48", 
            wrong_answer2: "52", 
            wrong_answer3: "54" 
        }
    ],
    expert: [
        { 
            id: 1, 
            question_text: "125 + 87 = ?", 
            correct_answer: "212", 
            wrong_answer1: "210", 
            wrong_answer2: "214", 
            wrong_answer3: "216" 
        },
        { 
            id: 2, 
            question_text: "156 - 78 = ?", 
            correct_answer: "78", 
            wrong_answer1: "76", 
            wrong_answer2: "80", 
            wrong_answer3: "82" 
        },
        { 
            id: 3, 
            question_text: "12 × 13 = ?", 
            correct_answer: "156", 
            wrong_answer1: "154", 
            wrong_answer2: "158", 
            wrong_answer3: "160" 
        },
        { 
            id: 4, 
            question_text: "144 ÷ 12 = ?", 
            correct_answer: "12", 
            wrong_answer1: "10", 
            wrong_answer2: "11", 
            wrong_answer3: "13" 
        },
        { 
            id: 5, 
            question_text: "89 + 67 = ?", 
            correct_answer: "156", 
            wrong_answer1: "154", 
            wrong_answer2: "158", 
            wrong_answer3: "160" 
        }
    ]
};

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Lidar com preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const { path: requestPath, httpMethod } = event;
        
        // Rota para buscar perguntas
        if (requestPath.startsWith('/api/question/') && httpMethod === 'GET') {
            const pathParts = requestPath.split('/');
            const difficulty = pathParts[3];
            const count = parseInt(pathParts[4]) || 1;
            
            // Verificar se a dificuldade existe
            if (!mockQuestions[difficulty]) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Dificuldade não encontrada.' })
                };
            }
            
            // Embaralhar e pegar as perguntas solicitadas
            const questions = mockQuestions[difficulty];
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            const selectedQuestions = shuffled.slice(0, count);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(selectedQuestions)
            };
        }
        
        // Rota padrão
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Rota não encontrada' })
        };
        
    } catch (error) {
        console.error('Erro no servidor:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Erro interno do servidor' })
        };
    }
};
