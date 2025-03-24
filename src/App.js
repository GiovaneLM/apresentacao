import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import './App.css'; // Importa o arquivo de estilos CSS
import PageFormulario from './Pages/PageFormulario';
import PageInicio from './Pages/PageInicio';

function App() {
  return (
    <div className="App">
      <PageInicio />
      <PageFormulario />
    </div>
  );
}

export default App; // Exporta o componente App para ser utilizado em outros arquivos
