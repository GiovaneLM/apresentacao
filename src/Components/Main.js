import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import axios from 'axios'; // Importa o módulo axios para realizar requisições HTTP
import './Main.css'; // Corrige o caminho para o arquivo CSS

function Home() { // Define o componente Home como uma função
    const [message, setMessage] = useState(''); // Cria um estado para armazenar a mensagem da API
    useEffect(() => { // Define o efeito colateral que será executado após a renderização
        axios.get('http://localhost:5000/api/Home') // Realiza uma requisição GET para a API
            .then(response => { // Função a ser executada em caso de sucesso
                setMessage(response.data.message); // Atualiza o estado com a mensagem da API
            })
            .catch(error => { // Função a ser executada em caso de erro
                console.error('Erro ao obter dados' ); // Atualiza o estado com uma mensagem de erro
            });
    }, []); // Define a lista de dependências vazia para garantir que o efeito seja executado apenas uma vez
    return (
        <div>
            <main>
                <h1>Home</h1>
                <p>{message}</p>
            </main>
        </div>
    )
}

export default Home;