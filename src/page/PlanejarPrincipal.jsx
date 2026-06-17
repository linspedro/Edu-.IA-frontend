import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import { ClipboardList, Sparkles } from "lucide-react";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import { useNavigate } from "react-router";

function PlanejarPrincipal() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <MenuLateral />

      <section className="flex-1 bg-[#F8FAFC] overflow-auto">
        <MenuAzul />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Título */}
          <div className="mb-8">
            <TextHr
              TipoDeText={"Paragrafo"}
              text={"Planejar Aula"}
              color="#155A93"
              CorDoParagrafo={"#2499F9"}
              largura={"180px"}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            
            {/* Card Manual */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_10px_25px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col items-center text-center w-full">
              
              <div className="bg-blue-100 text-[#2F80ED] p-4 rounded-full mb-4">
                <ClipboardList size={40} />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-[#2F80ED]">
                Criar Cronograma
              </h3>

              <p className="text-gray-400 mt-2 mb-6 leading-relaxed text-sm md:text-base">
                Crie seu Cronograma de aula com controle total sobre cada detalhe
              </p>

              <ul className="space-y-3 text-gray-600 text-left w-full text-sm md:text-base">
                <li>✔ Controle total sobre o conteúdo</li>
                <li>✔ Personalize cada seção</li>
                <li>✔ Ideal para experiências específicas</li>
              </ul>

              <div className="mt-6 w-full flex justify-center">
                <BtnAzul
                  children={"Criar Cronograma"}
                  onClick={() => navigate("/CriarManualmente")}
                />
              </div>
            </div>

            {/* Card IA */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_10px_25px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col items-center text-center w-full">
              
              <div className="bg-yellow-100 text-[#F2C94C] p-4 rounded-full mb-4">
                <Sparkles size={40} />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-[#2F80ED]">
                Gerar com IA
              </h3>

              <p className="text-gray-400 mt-2 mb-6 leading-relaxed text-sm md:text-base">
                Use inteligência artificial para gerar um plano de aula completo
              </p>

              <ul className="space-y-3 text-gray-600 text-left w-full text-sm md:text-base">
                <li>✔ Geração rápida e inteligente</li>
                <li>✔ Baseado em melhores práticas</li>
                <li>✔ Exportável em PDF após geração</li>
              </ul>

              <div className="mt-6 w-full flex justify-center">
                <BtnAmarelo
                  children={"Gerar com IA"}
                  onClick={() => navigate("/GerarComIA")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default PlanejarPrincipal;