
import "../index.css";
export default function TextGraident ({Texto, TituloOuSubtitulo, tamanho = '20px'}) {
   if(TituloOuSubtitulo === 'titulo'){
    return <h1 style={{fontSize:tamanho,fontFamily:'Poppins'}} className="gradient-text">{Texto}</h1>
   }else if(TituloOuSubtitulo === 'Subtitulo'){
    return <p style={{fontSize:tamanho,fontFamily:'Poppins'}}  className="gradient-text">{Texto}</p>
   }else{
    return {Texto}
   }
}

