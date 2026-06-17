import { Home, BookOpen, Book, User, X, Menu } from "lucide-react";
import { useState } from "react";
import BntAzul from "./bntAzul";
import Edu from "../assets/Edu.png";
import { useNavigate } from "react-router";
import BtnAmarelo from "./BntAmarelo";

export default function MenuLateral() {
  const navigate = useNavigate();

  const [abrirPerfil, setAbrirPerfil] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  return (
    <>
      {/* Botão Menu Mobile */}
      <button
        className="fixed top-4 left-4 z-[100] md:hidden bg-[#0F4C81] p-2 rounded-lg text-white"
        onClick={() => setMenuMobileAberto(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay Mobile */}
      {menuMobileAberto && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuMobileAberto(false)}
        />
      )}

      {/* Menu */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          w-64 md:w-56
          h-screen
          bg-[#0F4C81]
          text-white
          flex flex-col
          justify-between
          z-50
          transition-transform duration-300
          ${
            menuMobileAberto
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Fechar Mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuMobileAberto(false)}
          />
        </div>

        {/* Topo */}
        <div className="p-4 text-center">
          <img
            src={Edu}
            alt="Edu+.IA"
            className="w-32 md:w-40 mx-auto"
          />
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-6 px-4 flex-1">
          <div className="flex items-center gap-3">
            <Home size={20} />
            <BntAzul
              children="Central"
              tamanho="150px"
              onClick={() => {
                navigate("/Principal");
                setMenuMobileAberto(false);
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <BookOpen size={20} />
            <BntAzul
              children="Planejar"
              tamanho="150px"
              onClick={() => {
                navigate("/PlanejarPrincipal");
                setMenuMobileAberto(false);
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Home size={20} />
            <BntAzul
              children="Atividades"
              tamanho="150px"
              onClick={() => {
                navigate("/GerarAtividades");
                setMenuMobileAberto(false);
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Book size={20} />
            <BntAzul
              children="Biblioteca"
              tamanho="150px"
              onClick={() => {
                navigate("/BibliotecaPrincipal");
                setMenuMobileAberto(false);
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
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] md:w-64 bg-[#1E4F8A] rounded-2xl shadow-2xl p-4 z-50">
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
                  <h2 className="text-lg md:text-xl font-bold">
                    Usuário
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <BtnAmarelo
                  tamanho="w-full"
                  children="Visualizar perfil"
                  onClick={() => navigate("/VisualizarPerfil")}
                />

                <BntAzul
                  tamanho="w-full"
                  children="Sair da conta"
                  onClick={() => navigate("/")}
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}