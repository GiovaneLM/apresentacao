// Importa o framework Express para criar e gerenciar o servidor web
const express = require('express');

// Importa o módulo mysql2 para interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Importa o módulo cors para permitir requisições de diferentes origens (Cross-Origin Resource Sharing)
const cors = require('cors');

// Importa o bcrypt para criptografar senhas
const bcrypt = require('bcrypt');

// Inicializa a aplicação Express
const app = express();

// Define a porta onde o servidor será executado
const port = 8000;

// Configura o middleware CORS para permitir requisições externas
app.use(cors());

// Configura o middleware para interpretar requisições com JSON
app.use(express.json());

// Rota de teste para verificar se o servidor está rodando
app.get('/api/data', (req, res) => {
    res.json({ message: 'Servidor está rodando!' });
});

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Endereço do servidor do banco de dados
    user: 'root', // Usuário do banco de dados
    password: '', // Senha do banco (vazio significa que não há senha)
    database: 'projetofinal' // Nome do banco de dados que será utilizado
});

// Testa a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack); // Exibe um erro caso a conexão falhe
        return;
    }
    console.log('Conectado ao banco de dados MySQL!'); // Mensagem de sucesso na conexão
});

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
    // Obtém os dados do corpo da requisição
    const { nome, cpf, rg, mae, endereco, complemento, cidade, bairro, estado, usuario, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !cpf || !rg || !mae || !endereco || !complemento || !cidade || !bairro || !estado || !usuario || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    // Verifica se o usuário já está cadastrado no banco de dados
    const checkusuarioSql = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(checkusuarioSql, [usuario], async (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuario:', err);
            return res.status(500).json({ error: "Erro ao verificar usuario." });
        }

        // Se já existir um usuário com esse nome, retorna um erro
        if (results.length > 0) {
            return res.status(400).json({ error: "Usuário já está cadastrado." });
        }

        // Criptografa a senha antes de armazená-la no banco de dados
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Query SQL para inserir o novo usuário no banco
        const sql = "INSERT INTO usuarios (nome,cpf,rg,mae,endereco,complemento,cidade,bairro,estado,usuario,senha) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)";
        
        // Executa a inserção no banco de dados
        db.query(sql, [nome, cpf, rg, mae, endereco, complemento, cidade, bairro, estado, usuario, hashedPassword], (err, result) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err); // Exibe erro caso a inserção falhe
                return res.status(500).json({ error: "Erro ao registrar usuário no banco de dados." });
            }

            // Verifica se a inserção foi bem-sucedida
            if (result.affectedRows > 0) {
                res.json({ message: "Usuário registrado com sucesso!" });
            } else {
                res.status(500).json({ error: "Falha na inserção do usuário." });
            }
        });
    });
});

// Rota para login do usuário
app.post('/login', (req, res) => {
    // Obtém os dados do corpo da requisição
    const { usuario, senha } = req.body;

    // Query SQL para buscar o usuário no banco
    const sql = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(sql, [usuario], async (err, results) => {
        if (err) {
            res.status(500).json({ error: "Erro ao verificar login." });
        } else if (results.length > 0) {
            // Compara a senha informada com a senha criptografada no banco
            const isMatch = await bcrypt.compare(senha, results[0].senha);
            if (isMatch) {
                res.json({ message: "Login bem-sucedido!" }); // Usuário autenticado com sucesso
            } else {
                res.status(401).json({ error: "Usuário ou senha incorretos." }); // Senha incorreta
            }
        } else {
            res.status(401).json({ error: "Usuário ou senha incorretos." }); // Usuário não encontrado
        }
    });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Exibe mensagem indicando que o servidor foi iniciado
});
