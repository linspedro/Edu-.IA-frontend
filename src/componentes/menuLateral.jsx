
import {
  Home,
  BookOpen,
  Book,
  UserRound,
  X,
  Menu,
  LogOut,
  ChevronRight,
  GraduationCap,
  UserRoundPen,
} from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import Edu from "../assets/Edu.png";
import { useAuth } from "../contexts/AuthContext";

const itensMenu = [
  {
    nome: "Central",
    descricao: "Visão geral",
    caminho: "/Principal",
    icone: Home,
  },
  {
    nome: "Planejar",
    descricao: "Planos de aula",
    caminho: "/PlanejarPrincipal",
    icone: BookOpen,
  },
  {
    nome: "Atividades",
    descricao: "Criar atividades",
    caminho: "/GerarAtividades",
    icone: GraduationCap,
  },
  {
    nome: "Biblioteca",
    descricao: "Seus materiais",
    caminho: "/BibliotecaPrincipal",
    icone: Book,
  },
];

export default function MenuLateral() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [abrirPerfil, setAbrirPerfil] = useState(false);

  const nomeUsuario = usuario?.nome || "Usuário";
  const inicial = nomeUsuario.charAt(0).toUpperCase();

  function navegarPara(caminho) {
    navigate(caminho);
    setMenuMobileAberto(false);
    setAbrirPerfil(false);
  }

  function sairDaConta() {
    logout();
    setMenuMobileAberto(false);
    setAbrirPerfil(false);
    navigate("/");
  }

  return (
    <>
      {/* Botão para abrir no celular */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={() => setMenuMobileAberto(true)}
        className="nao-imprimir fixed left-4 top-4 z-[100] flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C81] text-white shadow-lg transition hover:bg-[#1764A3] active:scale-95 md:hidden"
      >
        <Menu size={23} />
      </button>

      {/* Fundo do menu mobile */}
      {menuMobileAberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="nao-imprimir fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuMobileAberto(false)}
        />
      )}

      {/* Barra lateral */}
      <aside
        className={`
          nao-imprimir fixed left-0 top-0 z-50
          flex h-screen w-[270px] flex-col
          border-r border-white/10
          bg-gradient-to-b from-[#103F6B] via-[#0F4C81] to-[#0A3154]
          text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          md:sticky md:w-60 md:shrink-0 md:shadow-none
          ${
            menuMobileAberto
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo e cabeçalho */}
        <div className="relative border-b border-white/10 px-5 pb-6 pt-7">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuMobileAberto(false)}
            className="absolute right-4 top-4 rounded-lg p-2 text-blue-100 transition hover:bg-white/10 md:hidden"
          >
            <X size={21} />
          </button>

          <button
            type="button"
            onClick={() => navegarPara("/Principal")}
            className="mx-auto block rounded-xl transition hover:scale-[1.02]"
          >
            <img
              src={Edu}
              alt="Edu+.IA"
              className="mx-auto h-auto w-36 object-contain"
            />
          </button>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-100/80">
              Espaço do professor
            </p>
          </div>
        </div>

        {/* Navegação */}
       <nav className="menu-lateral-scroll flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/60">
            Menu principal
          </p>

          {itensMenu.map((item) => {
            const Icone = item.icone;
            const ativo =
              location.pathname === item.caminho ||
              (item.caminho === "/PlanejarPrincipal" &&
                location.pathname.startsWith("/Planejar")) ||
              (item.caminho === "/GerarAtividades" &&
                location.pathname.startsWith("/GerarAtividades")) ||
              (item.caminho === "/BibliotecaPrincipal" &&
                location.pathname.startsWith("/Visualizar"));

            return (
              <button
                key={item.caminho}
                type="button"
                onClick={() => navegarPara(item.caminho)}
                className={`
                  group relative flex w-full items-center gap-3
                  rounded-xl px-3 py-3.5 text-left
                  transition-all duration-200
                  ${
                    ativo
                      ? "bg-white text-[#0F4C81] shadow-md shadow-slate-950/10"
                      : "text-blue-50/85 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {ativo && (
                  <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-amber-400" />
                )}

                <span
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                    transition-colors
                    ${
                      ativo
                        ? "bg-[#E9F3FC] text-[#0F4C81]"
                        : "bg-white/10 text-blue-100 group-hover:bg-white/15"
                    }
                  `}
                >
                  <Icone size={20} strokeWidth={2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {item.nome}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11px] ${
                      ativo ? "text-slate-500" : "text-blue-100/60"
                    }`}
                  >
                    {item.descricao}
                  </span>
                </span>

                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform ${
                    ativo
                      ? "text-[#0F4C81]"
                      : "text-blue-100/40 group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            );
          })}

          {/* Cartão informativo */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/15 text-amber-300">
              <GraduationCap size={20} />
            </div>

            <p className="text-sm font-semibold text-white">
              Ensinar com propósito
            </p>

            <p className="mt-1.5 text-xs leading-5 text-blue-100/65">
              Organize suas ideias e simplifique seu planejamento docente.
            </p>
          </div>
        </nav>

        {/* Área do perfil */}
        <div className="relative border-t border-white/10 p-4">
          {abrirPerfil && (
            <div className="absolute bottom-[calc(100%-8px)] left-3 right-3 z-[60] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-800 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F1FC] font-bold text-[#0F4C81]">
                  {inicial}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{nomeUsuario}</p>
                  <p className="text-xs text-slate-500">Sua conta Edu+.IA</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navegarPara("/VisualizarPerfil")}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-blue-50 hover:text-[#0F4C81]"
              >
                <UserRoundPen size={18} />
                Visualizar perfil
              </button>

              <button
                type="button"
                onClick={sairDaConta}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Sair da conta
              </button>
            </div>
          )}

          <button
            type="button"
            aria-expanded={abrirPerfil}
            onClick={() => setAbrirPerfil((aberto) => !aberto)}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
              abrirPerfil
                ? "border-white/20 bg-white/15"
                : "border-transparent hover:border-white/10 hover:bg-white/[0.08]"
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-amber-300/80 bg-[#1A639C] text-lg font-bold text-white shadow-inner">
              {inicial}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{nomeUsuario}</p>
              <p className="mt-0.5 text-xs text-blue-100/65">
                Meu perfil
              </p>
            </div>

            <UserRound size={17} className="shrink-0 text-blue-100/70" />
          </button>

          <p className="mt-4 text-center text-[10px] tracking-wide text-blue-100/40">
            Edu+.IA · Planejamento inteligente
          </p>
        </div>
      </aside>
    </>
  );
}
