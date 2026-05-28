import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import TextGraident from "../componentes/textGraidient";
import { useNavigate } from "react-router";

function VisualizarBiblioteca() {
  let navigate = useNavigate();
  return (
    <section>
      <MenuAzul />

      {/* Conteúdo */}
      <div className="flex justify-center w-full py-10">
        <div className="bg-[#EAEAEA] w-full max-w-[900px] p-8 shadow-md">
          <BtnAzul
            children={"voltar"}
            onClick={() => {
              navigate("/BibliotecaPrincipal");
            }}
          />

          {/* Título */}
          <div className="mb-8">
            <TextGraident
              Texto="Gerar Plano de Aula com IA"
              TituloOuSubtitulo="titulo"
              tamanho={"28px"}
            />

            <TextGraident
              Texto="Preencha as informações básicas e deixe a IA criar um plano completo para você"
              TituloOuSubtitulo="Subtitulo"
              tamanho={"14px"}
            />
          </div>

          {/* PRIMEIRA TABELA */}
          <div className="border border-gray-500 text-sm">
            {/* Cabeçalho */}
            <div className="text-center font-bold text-blue-600 py-5 border-b border-gray-500">
              PLANO DE AULA MENSAL | TURMA
            </div>

            {/* Linhas */}
            {[
              ["MÊS", "Maio"],
              ["Organização:", "Trimestre"],
              ["Componentes curriculares:", ""],
              ["Habilidades:", "Aluno compreender a fotossíntese"],
              [
                "Objetos de conhecimento:",
                "Projetor, Lupas e Folhas de planta",
              ],
              ["Número total de aulas:", "1 aula"],
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[220px_1fr] border-b border-gray-400"
              >
                <div className="border-r border-gray-400 p-2 text-blue-700 text-right font-medium">
                  {item[0]}
                </div>

                <div className="p-2">{item[1]}</div>
              </div>
            ))}
          </div>

          {/* PLANOS E ESTRATÉGIAS */}
          <div className="mt-12">
            <h2 className="text-center text-blue-600 font-bold text-2xl mb-5">
              PLANOS E ESTRATÉGIAS
            </h2>

            <div className="border border-gray-500 text-sm">
              <div className="grid grid-cols-[120px_1fr] border-b border-gray-400">
                <div className="border-r border-gray-400 p-2 text-center text-blue-700">
                  AULAS/DATAS
                </div>

                <div className="p-2 text-center">
                  ENCAMINHAMENTOS PEDAGÓGICOS
                </div>
              </div>

              <div className="grid grid-cols-[120px_1fr]">
                <div className="border-r border-gray-400 p-2 bg-[#9BD8FF]">
                  20/5/2026
                </div>

                <div className="p-2 text-center">Química ecológica</div>
              </div>
            </div>
          </div>

          {/* PROCESSO AVALIATIVO */}
          <div className="mt-10">
            <h2 className="text-center text-blue-600 font-bold text-2xl mb-5">
              PROCESSO AVALIATIVO
            </h2>

            <div className="border border-gray-500 text-xs">
              <div className="grid grid-cols-3 border-b border-gray-400 text-center">
                <div className="border-r border-gray-400 p-2 text-blue-700">
                  INSTRUMENTOS AVALIATIVOS
                </div>

                <div className="border-r border-gray-400 p-2 text-blue-700">
                  TIPO DE AVALIAÇÃO
                </div>

                <div className="p-2 text-blue-700">CRITÉRIOS</div>
              </div>

              <div className="grid grid-cols-3">
                <div className="border-r border-gray-400 p-2">
                  Atividade para colocar em prática o que aprendeu
                </div>

                <div className="border-r border-gray-400 p-2">
                  Divisão da turma em grupos para observar folhas com lupas
                </div>

                <div className="p-2">
                  Identificar as estruturas visíveis e relacionar com o que
                  aprenderam
                </div>
              </div>
            </div>
          </div>

          {/* MATERIAIS */}
          <div className="mt-10">
            <h2 className="text-center text-blue-600 font-bold text-2xl mb-5">
              MATERIAIS E RECURSOS
            </h2>

            <div className="border border-gray-500 text-sm">
              <div className="grid grid-cols-[120px_1fr] border-b border-gray-400">
                <div className="border-r border-gray-400 p-2 text-center text-blue-700">
                  AULAS/DATAS
                </div>

                <div className="p-2 text-center">
                  Possíveis materiais necessários
                </div>
              </div>

              <div className="grid grid-cols-[120px_1fr]">
                <div className="border-r border-gray-400 p-2 bg-[#9BD8FF]">
                  14/05/2026
                </div>

                <div className="p-2">
                  Projetor, lupas, folhas de planta e slides ilustrativos
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <BtnAmarelo children={"exporta em Pdf"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualizarBiblioteca;
