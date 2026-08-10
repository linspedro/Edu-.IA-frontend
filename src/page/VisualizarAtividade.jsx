import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import BtnAmarelo from "../componentes/BntAmarelo";
import { useNavigate } from "react-router";

function VisualizarAtividade() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul Text={"Atividades"} />

      <div className="flex">
        <MenuLateral />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h1 className="text-4xl font-bold text-gray-800">
              Campeonato de Matemática
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
              Matemática • 2º Ensino Médio
            </p>

            <hr className="mb-8" />

            {/* Informações Principais */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-5">
                Informações Principais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Título</p>
                  <p className="font-semibold text-lg">
                    Campeonato de Matemática
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Disciplina</p>
                  <p className="font-semibold text-lg">
                    Matemática
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Público-alvo</p>
                  <p className="font-semibold text-lg">
                    2º Ensino Médio
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Duração Estimada</p>
                  <p className="font-semibold text-lg">
                    50 minutos
                  </p>
                </div>

              </div>
            </section>

            {/* Objetivo */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Objetivo da Atividade
              </h2>

              <p className="text-gray-700 leading-7">
                Desenvolver o raciocínio lógico, incentivar o trabalho em equipe
                e promover a resolução de problemas matemáticos através de uma
                competição saudável entre os alunos.
              </p>
            </section>

            {/* Descrição */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Descrição da Atividade
              </h2>

              <p className="text-gray-700 leading-7">
                Os alunos serão divididos em equipes para participar de um
                campeonato de matemática. Cada equipe responderá desafios de
                diferentes níveis de dificuldade. Cada resposta correta soma
                pontos e, ao final, vence a equipe com a maior pontuação.
              </p>
            </section>

            {/* Observações */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Observações para a IA
              </h2>

              <p className="text-gray-700 leading-7">
                Criar perguntas fáceis, médias e difíceis envolvendo álgebra,
                geometria, porcentagem e raciocínio lógico, priorizando questões
                contextualizadas.
              </p>
            </section>

            {/* Materiais */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Materiais e Recursos
              </h2>

              <p className="text-gray-700 leading-7">
                Projetor multimídia, quadro branco, pincéis, cronômetro, folhas
                para respostas e calculadora (opcional).
              </p>
            </section>

            <div className="flex flex-wrap gap-4 justify-end">
              <BtnAmarelo children={"Exportar em PDF"} />

              <BtnAmarelo
                children={"Voltar"}
                onClick={() => navigate("/BibliotecaPrincipal")}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualizarAtividade;