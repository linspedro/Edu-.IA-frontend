
export default function TextHr({ text, TipoDeText, color = "#F5D553", largura,CorDoParagrafo }) {
    if (TipoDeText === 'Titulo') {
        return (
            <div >
                <h2 style={{fontSize: '30px', color: CorDoParagrafo, fontFamily:'Poppins'}} >{text}</h2>
                <hr 
                    style={{
                        border: 'none',
                        height: '2px',
                        backgroundColor: color,
                        width: largura,
                       
                    }}
                />
            </div>
        );
    }else if(TipoDeText === 'Paragrafo'){
              return(

                  <div>
                <p style={{fontSize: '25px', color: CorDoParagrafo,fontFamily:'Poppins'}}>{text}</p>
                <hr 
                    style={{
                        border: 'none',
                        height: '2px',
                        backgroundColor: color,
                        width: largura
                    }}
                    />
            </div>
                )  
    }
}