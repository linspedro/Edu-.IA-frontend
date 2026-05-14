import { Home, BookOpen, Book, User, X } from "lucide-react";
import { useState } from "react";
import BntAzul from "./bntAzul";
import Edu from "../assets/Edu.png";
import { useNavigate } from "react-router";
import BtnAmarelo from "./BntAmarelo";


export default function MenuLateral() {
  let navigate = useNavigate();

  const [abrirPerfil, setAbrirPerfil] = useState(false);

  return (
    <aside className="w-56 h-screen bg-[#0F4C81] text-white flex flex-col justify-between sticky top-0 z-50 rounded-[2px] relative">
      
      {/* Topo */}
      <div className="p-4 text-center">
        <div className="text-3xl mb-2">
          <img src={Edu} />
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-8 px-4">
        <div className="flex items-center gap-3 text-[25px]">
          <Home size={20} />
          <BntAzul
            children={"Central"}
            tamanho={"150px"}
            onClick={() => {
              navigate("/Principal");
            }}
          />
        </div>

        <div className="flex items-center gap-3 text-[25px]">
          <BookOpen size={20} />
          <BntAzul
            children={"Planejar"}
            tamanho={"150px"}
            onClick={() => {
              navigate("/PlanejarPrincipal");
            }}
          />
        </div>

        <div className="flex items-center gap-3 text-[25px]">
          <Book size={20} />
          <BntAzul
            children={"Biblioteca"}
            tamanho={"150px"}
            onClick={() => {
              navigate("/BibliotecaPrincipal");
            }}
          />
        </div>
      </div>

      {/* Perfil */}
      <div className="p-4 text-center relative">
        <div
          className="flex justify-center mb-2 cursor-pointer hover:opacity-75"
          onClick={() => setAbrirPerfil(!abrirPerfil)}
        >
          <User size={25} />
        </div>

        <span className="text-sm">Meu Perfil</span>

        {/* Popup */}
        {abrirPerfil && (
          <div className="absolute bottom-20 left-16 w-64 bg-[#1E4F8A] rounded-2xl shadow-2xl p-4 z-50">
            
            {/* Fechar */}
            <div className="flex justify-end">
              <X
                size={18}
                className="cursor-pointer"
                onClick={() => setAbrirPerfil(false)}
              />
            </div>

            {/* Conteúdo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
                U
              </div>

              <div>
                <h2 className="text-xl font-bold ">Usuário</h2>
              </div>
            </div>

            {/* Botões */}

            <div className="flex flex-col gap-2">
            <BtnAmarelo children={'Visualizar perfil'} onClick={() => {navigate('/VisualizarPerfil')}}/>
            <BntAzul children={'Sair da conta'} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}