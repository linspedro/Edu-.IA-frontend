import Navbar from "../componentes/Menu";
import TextGraident from "../componentes/textGraidient";
import BntAmarelo from "../componentes/BntAmarelo";
import BntAzul from "../componentes/bntAzul";
import ImageContainer from "../componentes/containerImg";
import Manualmente from "../assets/manualmente.png";
import TextHr from "../componentes/textHr";
import ContainerSection from "../componentes/ContainerFunciona";
import InfoCard from "../componentes/infoCard";
import Footer from "../componentes/footer";

import { Pencil, SlidersHorizontal, Target } from "lucide-react";

function C_Plano() {
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
                Texto={"Criar Plano de Aula manual"}
                tamanho={"40px"}
              />

              <TextHr
                text={"Crie planos manualmente, organize e exporte em PDF"}
                TipoDeText={"Paragrafo"}
                largura={"570px"}
                CorDoParagrafo={"#fff"}
              />
            </div>

            {/* botões */}
            <div className="flex gap-4">
              <BntAzul children={"Criar planos"} tamanho={"150px"} />
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
            <ImageContainer img={Manualmente} />
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
              Texto={"Crie seu plano manual em 3 passos simples"}
              TituloOuSubtitulo={"Subtitulo"}
            />

            <div className="flex gap-5 mt-2.5">
              <InfoCard
                icon={<Pencil size={30} className="text-white" />}
                title={"Defina o conteúdo"}
                description={
                  "Escolha disciplina, turma, materiais, trimestre e o que vão aprender."
                }
              />

              <InfoCard
                icon={<SlidersHorizontal size={30} className="text-white" />}
                title={"Organize seu plano"}
                description={
                  "Monte seu planejamento manualmente com liberdade total."
                }
              />

              <InfoCard
                icon={<Target size={30} className="text-white" />}
                title={"Finalize e use"}
                description={"Ajuste conforme sua realidade e aplique em sala."}
              />
            </div>
          </ContainerSection>
        </div>

        {/* CTA FINAL */}
        <div className="mt-36">
          <ContainerSection>
            <h3 className="text-3xl font-bold text-white">
              Pronto para criar seu primeiro plano?
            </h3>

            <p className="text-white">
              Crie planos manualmente na nossa plataforma em segundos
            </p>

            <div className="mt-2.5">
              <BntAzul children={"Criar Planos"} tamanho={"150px"} />
            </div>
          </ContainerSection>
        </div>
      </main>

      <Footer bottomText="Copyright © 2026 Edu+.IA" companyName="Edu+.IA" />
    </section>
  );
}

export default C_Plano;
