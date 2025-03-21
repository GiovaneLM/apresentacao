import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log('Form Data:', formData);

    // Enviar os dados para o servidor (exemplo)
    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => console.log('Resposta do servidor:', data))
      .catch(error => console.error('Erro ao enviar dados:', error));

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
      
      <h2>Formulário de cadastro </h2>
      <br></br>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rg">RG:</label>
          <input
            type="text"
            name="rg"
            id="rg"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mae">Nome da Mãe:</label>
          <input
            type="text"
            name="mae"
            id="mae"
            value={mae}
            onChange={(e) => setMae(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="complemento">Complemento:</label>
          <input
            type="text"
            name="complemento"
            id="complemento"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            name="cidade"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            name="bairro"
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            name="estado"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;