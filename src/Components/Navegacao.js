import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Mantém apenas Routes e Route
import './Navegacao.css';
import Home from './Main';
import Formulario from './Formulario';

function Navegacao() {
  return (
    <div>
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/Formulario">Formlario</a></li>
            </ul>
        </nav>

    </div>
  );
}

export default Navegacao;