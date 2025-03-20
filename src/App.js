import './App.css';
import React, { useState } from 'react';
import './server';

function App() {

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



  return (
    <div className="App">
      <form action="" method="post">
        <div className="nome">
          <input type="text" name="nome" id="nome" value={nome}/>
        </div>
        <div className="cpf">
          <input type="text" name="cpf" id="cpf" value={cpf}/>
        </div>
        <div className="rg">
          <input type="text" name="rg" id="rg" value={rg}/>
        </div>
        <div className="mae">
          <input type="text" name="mae" id="mae" value={mae}/>
        </div>
        <div className="endereco">
          <input type="text" name="endereco" id="endereco" value={endereco}/>
        </div>
        <div className="complemento">
          <input type="text" name="complemento" id="complemento" value={complemento}/>
        </div>
        <div className="cidade">
          <input type="text" name="cidade" id="cidade" value={cidade}/>
        </div>
        <div className="bairro">
          <input type="text" name="bairro" id="bairro" value={bairro}/>
        </div>
        <div className="estado">
          <input type="text" name="estado" id="estado" value={estado}/>
        </div>
        <div className="usuario">
          <input type="text" name="usuario" id="usuario" value={usuario}/>
        </div>
        <div className="senha">
          <input type="password" name="senha" id="senha" value={senha}/>
        </div>
        <input type="submit" value="enviar"/>
      </form>
    </div>
  );
}

export default App;