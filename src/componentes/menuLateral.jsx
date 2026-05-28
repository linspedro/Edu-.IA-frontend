import { Home, BookOpen, Book, User, X } from "lucide-react";
import { useState } from "react";
import BntAzul from "./bntAzul";
import Edu from "../assets/Edu.png";
import { useNavigate } from "react-router";
import BtnAmarelo from "./BntAmarelo";

export default function MenuLateral() {
  const navigate = useNavigate();

  const [abrirPerfil, setAbrirPerfil] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const closeAll = () => {
    setMenuMobileAberto(false);
    setAbrirPerfil(false);
  };

  return (
    <>
      {/* Botão hambúrguer (mobile) */}
      <button
        type="button"
        aria-label="Abrir menu"
        className="md:hidden fixed top-[92px] left-4 z-[60] bg-[#0F4C81] text-white p-2 rounded-md shadow"
        onClick={() => setMenuMobileAberto(true)}
      >
        ☰
      </button>

      {/* Overlay mobile */}
      {menuMobileAberto && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-[55]"
          onClick={closeAll}
        />
      )}

      {/* Menu (desktop/tablet) */}
      <aside className="w-56 h-screen bg-[#0F4C81] text-white flex flex-col justify-between sticky top-0 z-50 rounded-[2px] relative hidden md:flex">
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
            <div className="absolute bottom-20 left-16 w-64 max-w-[90vw] bg-[#1E4F8A] rounded-2xl shadow-2xl p-4 z-50">
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
                <BtnAmarelo
                  children={"Visualizar perfil"}
                  onClick={() => {
                    navigate("/VisualizarPerfil");
                  }}
                />
                <BntAzul
                  children={"Sair da conta"}
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Drawer mobile */}
      <aside
        className={`w-56 h-screen bg-[#0F4C81] text-white flex flex-col justify-between sticky top-0 z-[58] rounded-[2px] relative md:hidden transform transition-transform duration-200 ${
          menuMobileAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
                closeAll();
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
                closeAll();
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
                closeAll();
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

          {abrirPerfil && (
            <div className="absolute bottom-20 left-4 w-64 max-w-[90vw] bg-[#1E4F8A] rounded-2xl shadow-2xl p-4 z-50">
              <div className="flex justify-end">
                <X
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setAbrirPerfil(false)}
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
                  U
                </div>
                <div>
                  <h2 className="text-xl font-bold ">Usuário</h2>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <BtnAmarelo
                  children={"Visualizar perfil"}
                  onClick={() => {
                    navigate("/VisualizarPerfil");
                    closeAll();
                  }}
                />
                <BntAzul
                  children={"Sair da conta"}
                  onClick={() => {
                    navigate("/");
                    closeAll();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

