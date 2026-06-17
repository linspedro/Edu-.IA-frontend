import Navbar from "../componentes/Menu";
import TextGraident from "../componentes/textGraidient";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import Biblioteca from "../assets/Biblioteca.png";
import TextHr from "../componentes/textHr";
import ContainerSection from "../componentes/ContainerFunciona";
import InfoCard from "../componentes/infoCard";
import { BookOpen, Eye, Copy } from "lucide-react";
import Footer from "../componentes/footer";

function Blibioteca() {
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
                Texto="Biblioteca de Planos de Aula"
                tamanho="text-3xl sm:text-4xl lg:text-5xl"
              />

              <TextHr
                text="Explore planos criados por você e se organize"
                TipoDeText="Paragrafo"
                largura="w-full"
                CorDoParagrafo="#fff"
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <BntAzul children="Ver plano" />

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
            <ImageContainer img={Biblioteca} />
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div id="como-funciona" className="mt-20 md:mt-36 px-4">
          <ContainerSection>
            <TextGraident
              Texto="Como funciona"
              TituloOuSubtitulo="titulo"
              tamanho="text-3xl md:text-4xl"
            />

            <TextGraident
              Texto="Como funciona a Biblioteca em 3 passos simples"
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
                icon={<BookOpen size={30} className="text-white" />}
                title="Escolha um plano"
                description="Explore a biblioteca e encontre planos por disciplina, tema ou turma."
              />

              <InfoCard
                icon={<Eye size={30} className="text-white" />}
                title="Visualize o conteúdo"
                description="Abra o plano e veja todos os detalhes antes de usar."
              />

              <InfoCard
                icon={<Copy size={30} className="text-white" />}
                title="Copie ou exporte"
                description="Use o conteúdo como preferir: copie ou baixe em PDF."
              />
            </div>
          </ContainerSection>
        </div>

        {/* CTA FINAL */}
        <div className="mt-20 md:mt-36 px-4">
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
              Pronto para explorar nossa biblioteca de planos?
            </h3>

            <p className="text-white text-center">
              Encontre planos de aula completos e organizados
            </p>

            <div className="mt-3 w-full flex justify-center">
              <BntAzul
                children="Entrar na Biblioteca"
                tamanho="w-full sm:w-64"
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

export default Blibioteca;