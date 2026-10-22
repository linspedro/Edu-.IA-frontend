
import Navbar from "../componentes/Menu";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import Manualmente from "../assets/manualmente.png";
import ContainerSection from "../componentes/ContainerFunciona";
import Footer from "../componentes/footer";

import {
  Pencil,
  SlidersHorizontal,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router";

function C_Plano() {
  const navigate = useNavigate();

  const etapas = [
    {
      numero: "01",
      icone: <Pencil size={24} strokeWidth={1.8} />,
      titulo: "Defina o conteúdo",
      descricao:
        "Escolha a disciplina, a turma e o conteúdo que será trabalhado na aula.",
    },
    {
      numero: "02",
      icone: <SlidersHorizontal size={24} strokeWidth={1.8} />,
      titulo: "Organize seu plano",
      descricao:
        "Preencha os objetivos, os materiais e as informações do planejamento.",
    },
    {
      numero: "03",
      icone: <Target size={24} strokeWidth={1.8} />,
      titulo: "Revise e finalize",
      descricao:
        "Confira as informações e adapte o planejamento às necessidades dos alunos.",
    },
  ];

  return (
    <section className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main>
        {/* APRESENTAÇÃO */}
        <section className="border-b border-gray-100">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10">
            <div className="order-2 flex flex-col items-start sm:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                <Pencil size={15} />
                Planejamento manual
              </span>

              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                Crie planos de aula do seu jeito.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
                Organize suas ideias, defina os objetivos e estruture suas
                aulas com liberdade para personalizar cada detalhe.
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <BntAzul
                  children="Criar plano de aula"
                  onClick={() => navigate("/Cadastro")}
                />

                <BntAmarelo
                  children="Ver etapas"
                  onClick={() =>
                    document
                      .getElementById("como-funciona")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-600" />
                  Controle sobre as informações do plano
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-600" />
                  Organização conforme sua realidade escolar
                </span>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-md sm:order-2 lg:max-w-lg">
              <div className="rounded-3xl bg-[#F5F9FE] p-4 sm:p-6">
                <ImageContainer img={Manualmente} />
              </div>
            </div>
          </div>
        </section>

        {/* ETAPAS */}
        <section
          id="como-funciona"
          className="scroll-mt-20 px-5 py-14 sm:px-8 md:py-20"
        >
          <ContainerSection>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-wider text-blue-700">
                Como funciona
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Três etapas para planejar sua aula
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-500">
                Do conteúdo inicial à revisão final, você organiza o
                planejamento de forma simples e estruturada.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
              {etapas.map((etapa) => (
                <article
                  key={etapa.numero}
                  className="relative rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-blue-300 md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      {etapa.icone}
                    </div>

                    <span className="text-3xl font-bold text-blue-100">
                      {etapa.numero}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {etapa.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {etapa.descricao}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/Cadastro")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Começar meu planejamento
                <ArrowRight size={18} />
              </button>
            </div>
          </ContainerSection>
        </section>

        {/* CHAMADA FINAL */}
        <section className="border-t border-gray-100 bg-[#F8FAFC] px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Seu próximo plano começa aqui.
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Organize os conteúdos e prepare sua próxima aula.
              </p>
            </div>

            <BntAzul
              children="Criar plano"
              onClick={() => navigate("/Cadastro")}
            />
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

export default C_Plano;
