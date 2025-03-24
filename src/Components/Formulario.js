import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import './Formulario.css'; // Importa o arquivo de estilos CSS

function Formulario() {



    const [data, setData] = useState(null); // Estado para armazenar os dados recebidos da API

    useEffect(() => {
        // Hook useEffect para buscar dados da API quando o componente for montado
        fetch('http://localhost:5000/api/data') // Faz uma requisição GET para a API
            .then(response => response.json()) // Converte a resposta para JSON
            .then(data => {
                console.log(data); // Exibe os dados no console
                setData(data); // Atualiza o estado com os dados recebidos
            })
            .catch(error => console.error(error)); // Captura e exibe erros no console
    }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez

    // Estados para armazenar os valores do formulário
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [mae, setMae] = useState('');
    const [endereco, setEndereco] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const formData = {
            nome,
            cpf,
            rg,
            mae,
            endereco,
            complemento,
            cidade,
            bairro,
            estado,
            usuario,
            senha,
        };
        console.log('Form Data:', formData); // Exibe os dados do formulário no console

        // Envia os dados do formulário para o servidor
        fetch('http://localhost:8000/register', {
            method: 'POST', // Método HTTP POST
            headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
            body: JSON.stringify(formData), // Converte os dados para JSON e envia
        })
            .then(response => response.json()) // Converte a resposta para JSON
            .then(data => console.log('Resposta do servidor:', data)) // Exibe a resposta no console
            .catch(error => console.error('Erro ao enviar dados:', error)); // Captura e exibe erros

        // Limpa os campos do formulário após o envio
        setNome('');
        setCpf('');
        setRg('');
        setMae('');
        setEndereco('');
        setComplemento('');
        setCidade('');
        setBairro('');
        setEstado('');
        setUsuario('');
        setSenha('');
    };
    return (
        <div className="App">
            <h2>Formulário de cadastro</h2>
            <br />

            <form onSubmit={handleSubmit}> {/* Define o evento onSubmit para chamar handleSubmit */}
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="rg">RG:</label>
                    <input type="text" id="rg" value={rg} onChange={(e) => setRg(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="mae">Nome da Mãe:</label>
                    <input type="text" id="mae" value={mae} onChange={(e) => setMae(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="complemento">Complemento:</label>
                    <input type="text" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cidade">Cidade:</label>
                    <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="bairro">Bairro:</label>
                    <input type="text" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <input type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="usuario">Usuário:</label>
                    <input type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button type="submit">Enviar</button> {/* Botão de envio do formulário */}
            </form>
        </div>
    )
}

export default Formulario