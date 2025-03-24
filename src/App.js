import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter, Routes e Route
import './App.css'; // Importa o arquivo de estilos CSS
import PageFormulario from './Pages/PageFormulario';
import PageInicio from './Pages/PageInicio';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PageInicio />} /> {/* Rota para a página inicial */}
          <Route path="/Formulario" element={<PageFormulario />} /> {/* Rota para a página de formulário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Exporta o componente App para ser utilizado em outros arquivos
