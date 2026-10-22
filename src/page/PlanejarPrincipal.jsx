
import { useNavigate } from "react-router";
import {
  ClipboardList,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  WandSparkles,
} from "lucide-react";

import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";

function PlanejarPrincipal() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7FB] md:flex-row">
      <MenuLateral />

      <div className="flex min-w-0 flex-1 flex-col">
        <MenuAzul Text="Planejamento" />

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 md:p-8 lg:p-10">

          {/* CABEÇALHO */}
          <header>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Espaço de criação
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Planeje suas aulas
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
              Escolha como deseja criar seu planejamento pedagógico.
              Personalize cada detalhe manualmente ou conte com a inteligência
              artificial para começar mais rápido.
            </p>
          </header>

          {/* DESTAQUE */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064B87] to-[#3184C7] p-6 text-white shadow-md md:p-8">
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm">
                  <BookOpen size={16} />
                  <span>Seu planejamento em um só lugar</span>
                </div>

                <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                  Mais organização para ensinar melhor
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50 md:text-base">
                  Desenvolva aulas com objetivos claros, conteúdos organizados
                  e atividades adequadas às necessidades dos seus alunos.
                </p>
              </div>

              <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 md:flex">
                <ClipboardList size={52} strokeWidth={1.4} />
              </div>
            </div>
          </section>

          {/* ESCOLHA DO MÉTODO */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                Como deseja começar?
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Escolha uma das opções abaixo para continuar.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* PLANEJAMENTO MANUAL */}
              <article className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg md:p-8">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                    <ClipboardList size={29} strokeWidth={1.8} />
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    Personalizável
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Criar planejamento
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500">
                  Monte seu planejamento do zero e tenha controle sobre cada
                  informação da sua aula.
                </p>

                <div className="my-6 h-px bg-gray-100" />

                <p className="mb-4 text-sm font-semibold text-gray-800">
                  O que você pode fazer:
                </p>

                <ul className="space-y-3">
                  {[
                    "Definir os conteúdos e objetivos",
                    "Personalizar as informações da aula",
                    "Organizar o planejamento conforme sua necessidade",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => navigate("/CriarManualmente")}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Criar manualmente
                  <ArrowRight size={18} />
                </button>
              </article>

              {/* CRIAÇÃO COM IA */}
              <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg md:p-8">
                <div className="absolute right-0 top-0 rounded-bl-xl bg-blue-700 px-4 py-2 text-xs font-semibold text-white">
                  Com inteligência artificial
                </div>

                <div className="flex items-start justify-between pt-8 sm:pt-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-100">
                    <Sparkles size={29} strokeWidth={1.8} />
                  </div>

                  <WandSparkles
                    size={25}
                    className="text-blue-200"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Criar aula com IA
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500">
                  Gere uma primeira versão de um plano de aula com apoio da
                  inteligência artificial e adapte o resultado.
                </p>

                <div className="my-6 h-px bg-gray-100" />

                <p className="mb-4 text-sm font-semibold text-gray-800">
                  Conte com sugestões para:
                </p>

                <ul className="space-y-3">
                  {[
                    "Objetivos e habilidades educacionais",
                    "Materiais e desenvolvimento da aula",
                    "Estruturação inicial do planejamento",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => navigate("/GerarComIA")}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Sparkles size={18} />
                  Gerar aula com IA
                  <ArrowRight size={18} />
                </button>
              </article>

            </div>
          </section>

          {/* DICA */}
          <section className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
              <BookOpen size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Uma dica para seus planejamentos
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Sempre revise e adapte o planejamento à faixa etária, ao
                conteúdo trabalhado e às necessidades reais da turma. As
                sugestões geradas por IA devem ser conferidas antes do uso.
              </p>
            </div>
          </section>

          <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-400">
            Edu+.IA — Tecnologia a serviço da educação.
          </footer>

        </main>
      </div>
    </div>
  );
}

export default PlanejarPrincipal;
