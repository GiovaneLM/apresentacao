import React from 'react'
import Header from '../Components/Header'
import Navegacao from '../Components/Navegacao'
import Footer from '../Components/Footer'
function PageInicio() {
    return (
        <div>
            <Header />
            <Navegacao />
            <h1>Home</h1>
            <p>Seja bem-vindo ao site!</p>
            <Footer/>
        </div>
    )
}

export default PageInicio