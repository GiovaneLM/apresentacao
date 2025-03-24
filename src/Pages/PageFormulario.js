import React from 'react'
import Formulario from '../Components/Formulario'
import Header from '../Components/Header'
import Navegacao from '../Components/Navegacao'
import Footer from '../Components/Footer'


function PageFormulario() {
    return (
        <div>
            <Header />
            <Navegacao />
            <h1>Formulário</h1>
            <p>Preencha o formulário abaixo:</p>
            <Formulario />
            <Footer/>
    </div>
    )
}

export default PageFormulario;