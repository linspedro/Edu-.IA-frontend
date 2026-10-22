
import Navbar from "../componentes/Menu";
import TextGraident from "../componentes/textGraidient";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import Biblioteca from "../assets/Biblioteca.png";
import TextHr from "../componentes/textHr";
import ContainerSection from "../componentes/ContainerFunciona";
import InfoCard from "../componentes/infoCard";
import { BookOpen, Eye, Copy, Sparkles, ArrowRight } from "lucide-react";
import Footer from "../componentes/footer";
import { useNavigate } from "react-router";

function Blibioteca() {
  const navigate = useNavigate();

  const irParaComoFunciona = () => {
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-[#043B70] via-[#075DA8] to-[#2499F9]">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-200/10 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* TEXTO */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                <Sparkles size={16} className="text-yellow-300" />
                <span>Seu espaço de organização docente</span>
              </div>

              <div className="max-w-2xl">
                <TextGraident
                  TituloOuSubtitulo="titulo"
                  Texto="Biblioteca de Planos de Aula"
                  tamanho="text-4xl sm:text-5xl lg:text-6xl"
                />
              </div>

              <div className="mt-5 max-w-xl">
                <TextHr
                  text="Encontre, organize e consulte seus planejamentos pedagógicos em um só lugar. Mais praticidade para transformar ideias em aulas."
                  TipoDeText="Paragrafo"
                  largura="w-full"
                  CorDoParagrafo="#FFFFFF"
                />
              </div>

              <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row lg:justify-start">
                <BntAzul
                  children="Acessar biblioteca"
                  onClick={() => navigate("/Cadastro")}
                />

                <BntAmarelo
                  children="Como funciona"
                  onClick={irParaComoFunciona}
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/85 lg:justify-start">
                <span className="flex items-center gap-2">
                  <BookOpen size={17} />
                  Planos organizados
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={17} />
                  Consulta simplificada
                </span>
              </div>
            </div>

            {/* IMAGEM */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
              <div className="absolute inset-5 rounded-[2rem] bg-cyan-300/20 blur-2xl" />

              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm sm:p-5">
                <div className="overflow-hidden rounded-2xl bg-white p-2 sm:p-4">
                  <ImageContainer img={Biblioteca} />
                </div>

                <div className="flex items-center gap-3 px-2 py-4 sm:px-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-yellow-300">
                    <BookOpen size={23} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Seus planejamentos em um só lugar
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      Mais organização para sua rotina docente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section
          id="como-funciona"
          className="scroll-mt-20 bg-[#F5F9FF] px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#075DA8]">
                Simples e prático
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#12365A] sm:text-4xl">
                Como funciona a biblioteca?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Três passos para encontrar e aproveitar seus planos de aula
                com mais facilidade.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075DA8] to-[#2499F9] text-white shadow-lg shadow-blue-900/15">
                  <BookOpen size={28} />
                </div>

                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Passo 01
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#12365A]">
                  Encontre seu plano
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Localize seus planejamentos e encontre conteúdos de acordo
                  com sua organização pedagógica.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075DA8] to-[#2499F9] text-white shadow-lg shadow-blue-900/15">
                  <Eye size={28} />
                </div>

                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Passo 02
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#12365A]">
                  Visualize os detalhes
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Consulte objetivos, habilidades, materiais e etapas do
                  planejamento antes de utilizá-lo.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075DA8] to-[#2499F9] text-white shadow-lg shadow-blue-900/15">
                  <Copy size={28} />
                </div>

                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Passo 03
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#12365A]">
                  Aproveite o conteúdo
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Consulte e reutilize as informações conforme as necessidades
                  da sua prática pedagógica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 px-6 py-12 text-center shadow-2xl backdrop-blur-sm sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-yellow-300">
                <Sparkles size={32} />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-4xl">
                Organize seus planos. Simplifique sua rotina.
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100 sm:text-lg">
                Tenha seus planejamentos pedagógicos organizados e facilite
                o preparo das suas próximas aulas.
              </p>

              <div className="mt-8 flex justify-center">
                <BntAzul
                  children={
                    <span className="inline-flex items-center gap-2">
                      Explorar biblioteca
                      <ArrowRight size={18} />
                    </span>
                  }
                  tamanho="w-full sm:w-64"
                  onClick={() => navigate("/Cadastro")}
                />
              </div>
            </div>
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

export default Blibioteca;
