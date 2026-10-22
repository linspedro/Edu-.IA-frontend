
import Navbar from "../componentes/Menu";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import GerarIA from "../assets/GerarcomIA.png";
import Footer from "../componentes/footer";

import {
  Pencil,
  Cpu,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

import { useNavigate } from "react-router";

function G_Plano() {
  const navigate = useNavigate();

  const funcionalidades = [
    {
      icon: <Target size={28} className="text-white" />,
      titulo: "Planejamento personalizado",
      descricao:
        "Informe a disciplina, a turma e o conteúdo para orientar a criação do seu plano de aula.",
      cor: "bg-blue-700",
    },
    {
      icon: <Lightbulb size={28} className="text-white" />,
      titulo: "Ideias com inteligência artificial",
      descricao:
        "Receba uma proposta estruturada para ajudar na organização dos objetivos e das atividades.",
      cor: "bg-sky-600",
    },
    {
      icon: <BookOpen size={28} className="text-white" />,
      titulo: "Liberdade para personalizar",
      descricao:
        "Revise o planejamento gerado e adapte as sugestões à realidade da sua turma.",
      cor: "bg-blue-800",
    },
  ];

  const etapas = [
    {
      numero: "01",
      icon: <Pencil size={24} />,
      titulo: "Defina o conteúdo",
      descricao:
        "Informe a disciplina, a turma e o conteúdo que será trabalhado na aula.",
    },
    {
      numero: "02",
      icon: <Cpu size={24} />,
      titulo: "Gere com IA",
      descricao:
        "A inteligência artificial utiliza suas orientações para estruturar uma proposta de planejamento.",
    },
    {
      numero: "03",
      icon: <BookOpen size={24} />,
      titulo: "Revise e personalize",
      descricao:
        "Confira o resultado e ajuste o plano conforme os objetivos pedagógicos e as necessidades dos alunos.",
    },
  ];

  const irParaCadastro = () => navigate("/Cadastro");

  const irParaRecursos = () => {
    document
      .getElementById("recursos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen overflow-hidden bg-[#F4F7FB] text-gray-800">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#063D70] via-[#075A9B] to-[#3184C7]">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-blue-300/10" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
            {/* TEXTO */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50">
                <Cpu size={17} />
                Planejamento com inteligência artificial
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Crie seus planos de aula.
                <span className="mt-1 block text-blue-200">
                  Planeje com mais praticidade.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-blue-50 sm:text-lg">
                Transforme suas ideias em propostas de planejamento
                pedagógico. Informe o conteúdo, receba uma estrutura inicial
                com apoio da IA e personalize o resultado para sua turma.
              </p>

              <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
                <BntAmarelo
                  children="Criar plano agora"
                  onClick={irParaCadastro}
                />

                <BntAzul
                  children="Como funciona"
                  onClick={irParaRecursos}
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-blue-100 lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  Conteúdo personalizado
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  Apoio da IA
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  Autonomia docente
                </span>
              </div>
            </div>

            {/* IMAGEM */}
            <div className="mx-auto w-full max-w-md lg:max-w-xl">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm sm:p-5">
                <div className="overflow-hidden rounded-2xl bg-white p-3 sm:p-5">
                  <ImageContainer img={GerarIA} />
                </div>

                <div className="flex items-center gap-3 px-2 py-4 text-white sm:px-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Sparkles size={23} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Seu planejamento começa aqui
                    </p>
                    <p className="text-sm text-blue-100">
                      Tecnologia como apoio à educação
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECURSOS */}
        <section
          id="recursos"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-10"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Planejamento inteligente
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Recursos para apoiar sua prática docente
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Utilize a inteligência artificial como apoio para organizar
              ideias, estruturar objetivos e preparar suas aulas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {funcionalidades.map((item) => (
              <article
                key={item.titulo}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg md:p-7"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.cor}`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {item.titulo}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {item.descricao}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="border-y border-blue-100 bg-white px-5 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-700">
                Passo a passo
              </span>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Seu plano em três etapas
              </h2>

              <p className="mt-4 leading-7 text-gray-500">
                Você define as orientações, a IA ajuda na estruturação e
                você mantém o controle sobre o planejamento final.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {etapas.map((etapa) => (
                <article
                  key={etapa.numero}
                  className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-6 text-center transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
                      {etapa.icon}
                    </div>

                    <span className="text-3xl font-bold text-blue-100">
                      {etapa.numero}
                    </span>
                  </div>

                  <h3 className="mt-5 text-left text-lg font-bold text-gray-900">
                    {etapa.titulo}
                  </h3>

                  <p className="mt-3 text-left text-sm leading-6 text-gray-500">
                    {etapa.descricao}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={irParaCadastro}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Começar meu planejamento
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="px-5 py-16 md:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#064B87] to-[#3184C7] px-6 py-10 text-center shadow-lg sm:px-10 md:py-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <GraduationCap size={29} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Suas ideias podem se transformar em aulas melhores planejadas
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-50">
              Comece seu planejamento com o apoio da inteligência artificial
              e personalize cada etapa conforme as necessidades dos seus alunos.
            </p>

            <div className="mt-7 flex justify-center">
              <BntAmarelo
                children="Gerar meu plano"
                onClick={irParaCadastro}
              />
            </div>

            <p className="mt-4 text-xs text-blue-100">
              Edu+.IA — Tecnologia a serviço da educação.
            </p>
          </div>
        </section>
      </main>

      <Footer
        bottomText="Copyright © 2026 Edu+.IA"
        companyName="Edu+.IA"
      />
    </section>
  );
}

export default G_Plano;
