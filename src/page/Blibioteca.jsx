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
    <section className="bg-gradient-to-r from-[#054D88] to-[#2499F9] ">
      <Navbar />

      <main className="h-auto w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-6xl px-10 mt-10">
          {/* TEXTO */}
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="flex flex-col gap-3">
              <TextGraident
                TituloOuSubtitulo={"titulo"}
                Texto={"Biblioteca de Planos de Aula"}
                tamanho={"40px"}
              />

              <TextHr
                text={"Explore planos criados por você e se organize"}
                TipoDeText={"Paragrafo"}
                largura={"570px"}
                CorDoParagrafo={"#fff"}
              />
            </div>

            {/* botões */}
            <div className="flex gap-4">
              <BntAzul children={"Ver plano"} tamanho={"150px"} />
              <BntAmarelo
                children={"Como Funciona"}
                onClick={() => {
                  document
                    .getElementById("como-funciona")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>

          {/* IMAGEM */}
          <div className="w-full max-w-[400px]">
            <ImageContainer img={Biblioteca} />
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div id="como-funciona" className="mt-36">
          <ContainerSection>
            <TextGraident
              Texto={"Como funciona"}
              TituloOuSubtitulo={"titulo"}
              tamanho={"35px"}
            />
            <TextGraident
              Texto={"Como funciona a Biblioteca em 3 passos simples"}
              TituloOuSubtitulo={"Subtitulo"}
            />

            <div className="flex gap-5 mt-2.5">
              <InfoCard
                icon={<BookOpen size={30} className="text-white" />}
                title={"Escolha um plano"}
                description={
                  "Explore a biblioteca e encontre planos por disciplina, tema ou turma."
                }
              />

              <InfoCard
                icon={<Eye size={30} className="text-white" />}
                title={"Visualize o conteúdo"}
                description={
                  "Abra o plano e veja todos os detalhes antes de usar."
                }
              />

              <InfoCard
                icon={<Copy size={30} className="text-white" />}
                title={"Copie ou exporte"}
                description={
                  "Use o conteúdo como preferir: copie ou baixe em PDF."
                }
              />
            </div>
          </ContainerSection>
        </div>

        {/* CTA FINAL */}
        <div className="mt-36">
          <ContainerSection>
            <h3 className="text-3xl font-bold text-white">
              Pronto para explorar nossa biblioteca de planos?
            </h3>
            <p className="text-white">
              Encontre planos de aula completos e organizados
            </p>
            <div className="mt-2.5">
              <BntAzul children={"Entrar na Biblioteca"} tamanho={"250px"} />
            </div>
          </ContainerSection>
        </div>
      </main>

      <Footer bottomText="Copyright © 2026 Edu+.IA" companyName="Edu+.IA" />
    </section>
  );
}

export default Blibioteca;
