const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Inicializar o banco de dados
const dbPath = path.join(__dirname, '../../mathfly.db');
const db = new sqlite3.Database(dbPath);

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
            
            return new Promise((resolve) => {
                db.all(`SELECT * FROM questions_${difficulty} ORDER BY RANDOM() LIMIT ?`, [count], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        resolve({
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({ error: 'Erro ao buscar as perguntas.' })
                        });
                        return;
                    }
                    
                    if (rows.length === 0) {
                        resolve({
                            statusCode: 404,
                            headers,
                            body: JSON.stringify({ error: 'Nenhuma pergunta encontrada.' })
                        });
                        return;
                    }
                    
                    resolve({
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(rows)
                    });
                });
            });
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
