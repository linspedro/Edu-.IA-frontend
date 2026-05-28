import { useState } from 'react'
import Blibioteca from './page/Blibioteca'
import G_Plano from './page/G_Plano'
import C_Plano from './page/C_Plano'
import Login from './page/Login'
import PaginaPrincipal from './page/PaginaPrincipal'
import BibliotecaPrincipal from './page/BibliotecaPrincipal'
import PlanejarPrincipal from './page/PlanejarPrincipal'
import CriarManualmente from './page/criarManualmente'
import GerarcomIa from './page/GerarcomIa'
import VisualizarPerfil from './page/Visualizarperfil'
import Cadastro from './page/Cadastro'
import VisualizarBiblioteca from './page/visualizarBlibioteca'
import { BrowserRouter, Routes, Route } from "react-router";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    // 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blibioteca/>} />
        <Route path="/Gplano" element={<G_Plano />} />
        <Route path="/Cplano" element={<C_Plano />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Principal" element={<PaginaPrincipal />} />
        <Route path='/BibliotecaPrincipal' element={<BibliotecaPrincipal/>}/>
        <Route path='/PlanejarPrincipal' element={<PlanejarPrincipal/>}/>
        <Route path='/CriarManualmente' element={<CriarManualmente/>}/>
        <Route path='/GerarComIA' element={<GerarcomIa/>}/>
        <Route path='/VisualizarPerfil' element={<VisualizarPerfil/>}/>
        <Route path='/Cadastro' element={<Cadastro/>}/>
        <Route path='/VisualizarBibliotecao' element={<VisualizarBiblioteca/>}/>

      </Routes>
  </BrowserRouter>
  )
}

export default App
