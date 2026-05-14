
import "../index.css";

/**
 * Componente que renderiza um texto com estilo de gradiente,
 * podendo ser exibido como título (h1) ou subtítulo (p).
 *
 * @component
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.Texto - Texto a ser exibido
 * @param {'titulo' | 'Subtitulo'} props.TituloOuSubtitulo - Define o tipo de elemento a ser renderizado
 * @param {string|number} props.tamanho - Tamanho da fonte (ex: "24px", "1.5rem")
 *
 * @returns {JSX.Element} Elemento JSX com texto estilizado em gradiente
 */
export default function TextGraident ({Texto, TituloOuSubtitulo, tamanho }) {
   if(TituloOuSubtitulo === 'titulo'){
    return <h1 style={{fontSize:tamanho,fontFamily:'Poppins'}} className="gradient-text">{Texto}</h1>
   }else if(TituloOuSubtitulo === 'Subtitulo'){
    return <p style={{fontSize:tamanho,fontFamily:'Poppins'}}  className="gradient-text">{Texto}</p>
   }else{
    return {Texto}
   }
}

