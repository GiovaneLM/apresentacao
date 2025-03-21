const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Biblioteca para criptografar senhas

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get('/api/data', (req, res) => {
    res.json({ message: 'Servidor está rodando!' });
});


// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Servidor do banco
    user: 'root', // Usuário do banco
    password: '', // Senha (se tiver)
    database: 'projetofinal' // Nome do banco de dadosnode
});

// Teste de conexão com o banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota de Registro (Criação de Usuário)
app.post('/register', async (req, res) => {
    const { nome, cpf, rg, mae, endereco, complemento, cidade, bairro, estado, usuario, senha } = req.body;

    if (!nome || !cpf || !rg || !mae || !endereco || !complemento || !cidade || !bairro || !estado || !usuario || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    // Verifica se o email já está cadastrado
    const checkusuarioSql = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(checkusuarioSql, [usuario], async (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuario:', err);
            return res.status(500).json({ error: "Erro ao verificar usuario." });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "usuario já está cadastrado." });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        const sql = "INSERT INTO usuarios (nome,cpf,rg,mae,endereco,complemento,cidade,bairro,estado,usuario,senha) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)";
        db.query(sql, [nome, cpf, rg, mae, endereco, complemento, cidade, bairro, estado, usuario, hashedPassword], (err, result) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err); // Log de erro para identificar falhas na inserção
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

// Rota de Login (Autenticação de Usuário)
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(sql, [usuario], async (err, results) => {
        if (err) {
            res.status(500).json({ error: "Erro ao verificar login." });
        } else if (results.length > 0) {
            const isMatch = await bcrypt.compare(senha, results[0].senha);
            if (isMatch) {
                res.json({ message: "Login bem-sucedido!" });
            } else {
                res.status(401).json({ error: "usuario ou senha incorretos." });
            }
        } else {
            res.status(401).json({ error: "usuario ou senha incorretos." });
        }
    });
});

// Iniciando o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});