import Navbar from "../componentes/Menu";
import TextGraident from "../componentes/textGraidient";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import GerarIA from "../assets/GerarcomIA.png";
import TextHr from "../componentes/textHr";
import ContainerSection from "../componentes/ContainerFunciona";
import InfoCard from "../componentes/infoCard";
import Footer from "../componentes/footer";

import { Pencil, Cpu, BookOpen } from "lucide-react";

function G_Plano() {
  return (
    <section className="bg-gradient-to-r from-[#054D88] to-[#2499F9] min-h-screen">
      <Navbar />

      <main className="w-full flex flex-col items-center">
        {/* HERO */}
        <div
          className="
            flex
            flex-col-reverse
            lg:flex-row
            items-center
            justify-between
            w-full
            max-w-6xl
            px-4
            md:px-8
            mt-10
            gap-10
          "
        >
          {/* TEXTO */}
          <div className="flex flex-col gap-8 max-w-xl text-center lg:text-left">
            <div className="flex flex-col gap-3">
              <TextGraident
                TituloOuSubtitulo="titulo"
                Texto="Gerador de Plano de Aula com IA"
                tamanho="text-3xl sm:text-4xl lg:text-5xl"
              />

              <TextHr
                text="Crie planos de aula completos em segundos."
                TipoDeText="Paragrafo"
                largura="w-full"
                CorDoParagrafo="#fff"
              />
            </div>

            {/* BOTÕES */}
            <div className="flex flex-col sm:flex-row gap-4">
              <BntAzul
                children="Criar Plano Agora"
                tamanho="w-full sm:w-52"
              />

              <BntAmarelo
                children="Como Funciona"
                onClick={() => {
                  document
                    .getElementById("como-funciona")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>

          {/* IMAGEM */}
          <div
            className="
              w-full
              max-w-xs
              sm:max-w-sm
              md:max-w-md
            "
          >
            <ImageContainer img={GerarIA} />
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div
          id="como-funciona"
          className="mt-20 md:mt-36 px-4 w-full flex justify-center"
        >
          <ContainerSection>
            <TextGraident
              Texto="Como funciona"
              TituloOuSubtitulo="titulo"
              tamanho="text-3xl md:text-4xl"
            />

            <TextGraident
              Texto="Crie seu plano em 3 passos simples"
              TituloOuSubtitulo="Subtitulo"
            />

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-5
                mt-4
                w-full
              "
            >
              <InfoCard
                icon={<Pencil size={30} className="text-white" />}
                title="Defina o conteúdo"
                description="Escolha disciplina, turma, materiais e o que vão aprender."
              />

              <InfoCard
                icon={<Cpu size={30} className="text-white" />}
                title="Gere com IA"
                description="Nossa IA cria um plano completo e estruturado."
              />

              <InfoCard
                icon={<BookOpen size={30} className="text-white" />}
                title="Personalize e use"
                description="Ajuste conforme sua realidade e aplique em sala."
              />
            </div>
          </ContainerSection>
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-36 px-4 mb-10">
          <ContainerSection>
            <h3
              className="
                text-2xl
                md:text-3xl
                font-bold
                text-white
                text-center
              "
            >
              Pronto para economizar horas de planejamento?
            </h3>

            <p className="text-white text-center">
              Crie planos de aula completos em segundos com nossa IA.
            </p>

            <div className="mt-3 w-full flex justify-center">
              <BntAzul
                children="Gerar Planos"
                tamanho="w-full sm:w-52"
              />
            </div>
          </ContainerSection>
        </div>
      </main>

      <Footer
        bottomText="Copyright © 2026 Edu+.IA"
        companyName="Edu+.IA"
      />
    </section>
  );
}

export default G_Plano;