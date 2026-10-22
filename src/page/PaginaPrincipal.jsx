
import { useNavigate } from "react-router";
import {
  BookOpen,
  Book,
  Sparkles,
  ClipboardList,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import InfoCard from "../componentes/infoCard";
import IAImg from "../assets/imgPrincipal.png";
import { useAuth } from "../contexts/AuthContext";

function PaginaPrincipal() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const nomeUsuario =
    usuario?.nome?.trim()?.split(" ")[0] || "professor";

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7FB] md:flex-row">
      <MenuLateral />

      <main className="min-w-0 flex-1 p-4 md:p-8 lg:p-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

          {/* CABEÇALHO */}
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
                Edu+.IA • Planejamento inteligente
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Bem-vindo, {nomeUsuario}!
              </h1>

              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Organize suas aulas e crie atividades com mais praticidade.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <CalendarDays size={21} className="text-blue-700" />
              <div>
                <p className="text-xs text-gray-500">Hoje</p>
                <p className="text-sm font-semibold capitalize text-gray-800">
                  {hoje}
                </p>
              </div>
            </div>
          </header>

          {/* DESTAQUE */}
          <section className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#064B87] via-[#126DB4] to-[#3184C7] px-6 py-8 text-white shadow-md md:flex-row md:px-10 md:py-10">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                <Sparkles size={16} />
                Seu assistente pedagógico
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                Mais tempo para ensinar.
                <br />
                Menos tempo planejando.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-50 md:text-base">
                Crie planos de aula e atividades com apoio da inteligência
                artificial, organize seus materiais e mantenha tudo em um só
                lugar.
              </p>

              <button
                type="button"
                onClick={() => navigate("/PlanejarPrincipal")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
              >
                Começar planejamento
                <ArrowRight size={18} />
              </button>
            </div>

            <img
              src={IAImg}
              alt="Ilustração do assistente de inteligência artificial Edu+.IA"
              className="w-44 max-w-full object-contain drop-shadow-lg sm:w-56 md:w-64"
            />
          </section>

          {/* AÇÕES RÁPIDAS */}
          <section>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Ações rápidas
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Escolha o que deseja fazer agora.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <InfoCard
                title="Planejar aula"
                description="Crie planos de aula estruturados para suas turmas."
                icon={<Book size={28} className="text-white" />}
                onClick={() => navigate("/PlanejarPrincipal")}
              />

              <InfoCard
                title="Minha biblioteca"
                description="Consulte e organize seus conteúdos salvos."
                icon={<BookOpen size={28} className="text-white" />}
                onClick={() => navigate("/BibliotecaPrincipal")}
              />

              <InfoCard
                title="Criar atividades"
                description="Gere ideias de atividades para seus alunos."
                icon={<ClipboardList size={28} className="text-white" />}
                onClick={() => navigate("/GerarAtividades")}
              />
            </div>
          </section>

          {/* DESTAQUE DE IA */}
          <section className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Sparkles size={25} />
              </div>

              <div>
                <p className="font-semibold text-blue-700">
                  Inteligência artificial na educação
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Transforme suas ideias em planejamentos
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Receba sugestões de objetivos, habilidades, materiais e
                  desenvolvimento das aulas. Revise e adapte o conteúdo
                  conforme as necessidades da sua turma.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/PlanejarPrincipal")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Experimentar
              <ArrowRight size={18} />
            </button>
          </section>

          {/* RODAPÉ */}
          <footer className="border-t border-gray-200 pt-5 text-center text-sm text-gray-400">
            Edu+.IA — Tecnologia a serviço da educação.
          </footer>

        </div>
      </main>
    </div>
  );
}

export default PaginaPrincipal;
