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

// ✅ IMPORT CORRETO
import { Pencil, Cpu, BookOpen } from "lucide-react";

function G_Plano() {
  return (
    <section className="bg-gradient-to-r from-[#054D88] to-[#2499F9]">
      <Navbar />

      <main className="h-auto w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-6xl px-10 mt-10">
          {/* TEXTO */}
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="flex flex-col gap-3">
              <TextGraident
                TituloOuSubtitulo={"titulo"}
                Texto={"Gerador de Plano de Aula com IA"}
                tamanho={"40px"}
              />

              <TextHr
                text={"Crie planos de aula completos em segundos."}
                TipoDeText={"Paragrafo"}
                largura={"570px"}
                CorDoParagrafo={"#fff"}
              />
            </div>

            <div className="flex gap-4">
              <BntAzul children={"Criar Plano Agora"} tamanho={"200px"} />
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
            <ImageContainer img={GerarIA} />
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
              Texto={"Crie seu plano em 3 passos simples"}
              TituloOuSubtitulo={"Subtitulo"}
            />

            <div className="flex gap-5 mt-2.5">
              <InfoCard
                icon={<Pencil size={30} className="text-white" />}
                title={"Defina o conteúdo"}
                description={
                  "Escolha disciplina, turma, materiais e o que vão aprender."
                }
              />

              <InfoCard
                icon={<Cpu size={30} className="text-white" />}
                title={"Gere com IA"}
                description={"Nossa IA cria um plano completo e estruturado."}
              />

              <InfoCard
                icon={<BookOpen size={30} className="text-white" />}
                title={"Personalize e use"}
                description={"Ajuste conforme sua realidade e aplique em sala."}
              />
            </div>
          </ContainerSection>
        </div>

        {/* CTA */}
        <div className="mt-36">
          <ContainerSection>
            <h3 className="text-3xl font-bold text-white">
              Pronto para economizar horas de planejamento?
            </h3>
            <p className="text-white">
              Crie planos de aula completos em segundos com nossa IA.
            </p>
            <div className="mt-2.5">
              <BntAzul children={"Gerar Planos"} tamanho={"200px"} />
            </div>
          </ContainerSection>
        </div>
      </main>

      <Footer bottomText="Copyright © 2026 Edu+.IA" companyName="Edu+.IA" />
    </section>
  );
}

export default G_Plano;
