import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import InfoCard from "../componentes/infoCard";
import IAImg from "../assets/imgPrincipal.png";
import { useNavigate } from "react-router";

import { BookOpen, Book, Sparkles } from "lucide-react";

function PaginaPrincipal() {
  const today = new Date().toLocaleDateString();
  let navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <MenuLateral />

      <section className="flex-1 p-6 bg-[#3184C7] flex flex-col gap-4 overflow-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start max-w-6xl mx-auto w-full">

          <div className="text-white flex flex-col gap-2.5">
            <h2 className="text-4xl">Bem-vindo ao Edu+</h2>

            <TextHr
              text={"Sua plataforma completa para planejamento educacional"}
              TipoDeText={"Paragrafo"}
              largura={"750px"}
            />
          </div>

          <div
            className="bg-gradient-to-r from-[#054D88] to-[#2499F9]
            w-[150px] h-[35px] text-[18px] text-center text-white
            rounded-[10px] border-amber-300 border-[1.5px]"
          >
            <p>{today}</p>
          </div>
        </div>

          {/* HERO CORRIGIDO */}
        <div className="flex flex-col md:flex-row justify-between max-w-6xl w-full mt-10">
          {/* CARD PROF */}
          <div className="bg-[#054D88] text-white text-2xl w-[200px] h-28 px-4 py-3 rounded-lg shadow-md flex items-center">
            Bem-vindo <br /> Prof Nome
          </div>

          {/* IMAGEM CORRIGIDA */}
          <img src={IAImg} alt="Ilustração" className="w-[240px] top-0 " />
        </div>

        {/* AÇÕES RÁPIDAS */}
        <div className="text-white max-w-6xl  top-0">
          <TextHr
            text={"Ações Rápidas"}
            TipoDeText={"Paragrafo"}
            largura={"190px"}
          />
        </div>

        <div className="flex gap-4 max-w-6xl  ">
          <InfoCard
            title={"Planejar aula"}
            description={"Crie planos de aula estruturados"}
            icon={<Book size={28} className="text-white" />}
            onClick={() => {
              navigate("/PlanejarPrincipal");
            }}
          />

          <InfoCard
            title={"Biblioteca"}
            description={"Acesse seus planos salvos"}
            icon={<BookOpen size={28} className="text-white" />}
            onClick={() => {
              navigate("/BibliotecaPrincipal");
            }}
          />
        </div>

        {/* NOVIDADE IA */}
        <div
          className="
          mt-6
          max-w-6xl mx-auto
          w-full
          h-24
          flex items-center justify-between
          px-6 py-4
          rounded-2xl
          text-white
          bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500
          shadow-md
        "
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="text-xl font-semibold">
                Novidade: Gerar com IA
              </span>
            </div>

            <span className="text-sm opacity-90 leading-snug">
              Agora você pode criar planos de aula completos usando inteligência
              artificial. Economize tempo e tenha sugestões personalizadas!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaginaPrincipal;
