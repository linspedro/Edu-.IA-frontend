import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import TextGraident from "../componentes/textGraidient";
import { useNavigate } from "react-router";

function VisualizarBiblioteca() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-white">
      <MenuAzul Text={'Biblioteca'}/>

      {/* Conteúdo */}
      <div className="flex justify-center w-full py-6 md:py-10 px-4">
        <div className="bg-[#EAEAEA] w-full max-w-[900px] p-4 md:p-8 shadow-md rounded-lg">

          <div className="mb-4 md:mb-6">
            <BtnAzul
              children={"Voltar"}
              onClick={() => navigate("/BibliotecaPrincipal")}
            />
          </div>

          {/* Título */}
          <div className="mb-6 md:mb-8">
            <TextGraident
              Texto="Gerar Plano de Aula com IA"
              TituloOuSubtitulo="titulo"
              tamanho={"22px md:28px"}
            />

            <TextGraident
              Texto="Preencha as informações básicas e deixe a IA criar um plano completo para você"
              TituloOuSubtitulo="Subtitulo"
              tamanho={"12px md:14px"}
            />
          </div>

          {/* TABELA 1 */}
          <div className="border border-gray-400 text-sm overflow-x-auto">
            <div className="text-center font-bold text-blue-600 py-4 md:py-5 border-b border-gray-400 text-xs md:text-base">
              PLANO DE AULA MENSAL | TURMA
            </div>

            {[
              ["MÊS", "Maio"],
              ["Organização:", "Trimestre"],
              ["Componentes curriculares:", ""],
              ["Habilidades:", "Aluno compreender a fotossíntese"],
              ["Objetos de conhecimento:", "Projetor, Lupas e Folhas de planta"],
              ["Número total de aulas:", "1 aula"],
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-gray-300"
              >
                <div className="p-2 text-blue-700 font-medium md:text-right border-b md:border-b-0 md:border-r border-gray-300">
                  {item[0]}
                </div>
                <div className="p-2">{item[1]}</div>
              </div>
            ))}
          </div>

          {/* PLANOS E ESTRATÉGIAS */}
          <div className="mt-8 md:mt-12">
            <h2 className="text-center text-blue-600 font-bold text-xl md:text-2xl mb-4 md:mb-5">
              PLANOS E ESTRATÉGIAS
            </h2>

            <div className="border border-gray-400 text-sm overflow-x-auto">
              <div className="grid grid-cols-2 md:grid-cols-[120px_1fr] border-b border-gray-300 text-center">
                <div className="p-2 text-blue-700 border-r border-gray-300">
                  AULAS/DATAS
                </div>
                <div className="p-2 text-blue-700">
                  ENCAMINHAMENTOS PEDAGÓGICOS
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-[120px_1fr]">
                <div className="p-2 bg-[#9BD8FF] border-r border-gray-300">
                  20/5/2026
                </div>
                <div className="p-2 text-center">Química ecológica</div>
              </div>
            </div>
          </div>

          {/* AVALIAÇÃO */}
          <div className="mt-8 md:mt-10">
            <h2 className="text-center text-blue-600 font-bold text-xl md:text-2xl mb-4 md:mb-5">
              PROCESSO AVALIATIVO
            </h2>

            <div className="border border-gray-400 text-xs md:text-sm overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 text-center border-b border-gray-300">
                <div className="p-2 text-blue-700 border-b md:border-b-0 md:border-r border-gray-300">
                  INSTRUMENTOS AVALIATIVOS
                </div>
                <div className="p-2 text-blue-700 border-b md:border-b-0 md:border-r border-gray-300">
                  TIPO DE AVALIAÇÃO
                </div>
                <div className="p-2 text-blue-700">
                  CRITÉRIOS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2 border-b md:border-b-0 md:border-r border-gray-300">
                  Atividade para colocar em prática o que aprendeu
                </div>
                <div className="p-2 border-b md:border-b-0 md:border-r border-gray-300">
                  Divisão da turma em grupos para observar folhas com lupas
                </div>
                <div className="p-2">
                  Identificar estruturas visíveis e relacionar com o que aprenderam
                </div>
              </div>
            </div>
          </div>

          {/* MATERIAIS */}
          <div className="mt-8 md:mt-10">
            <h2 className="text-center text-blue-600 font-bold text-xl md:text-2xl mb-4 md:mb-5">
              MATERIAIS E RECURSOS
            </h2>

            <div className="border border-gray-400 text-sm overflow-x-auto">
              <div className="grid grid-cols-2 md:grid-cols-[120px_1fr] border-b border-gray-300 text-center">
                <div className="p-2 text-blue-700 border-r border-gray-300">
                  DATA
                </div>
                <div className="p-2">
                  Possíveis materiais necessários
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-[120px_1fr]">
                <div className="p-2 bg-[#9BD8FF] border-r border-gray-300">
                  14/05/2026
                </div>
                <div className="p-2">
                  Projetor, lupas, folhas de planta e slides
                </div>
              </div>
            </div>
          </div>

          {/* BOTÃO */}
          <div className="mt-6 flex justify-center">
            <BtnAmarelo children={"Exportar em PDF"} />
          </div>

        </div>
      </div>
    </section>
  );
}

export default VisualizarBiblioteca;