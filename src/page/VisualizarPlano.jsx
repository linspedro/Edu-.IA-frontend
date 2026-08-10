import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import BtnAmarelo from "../componentes/BntAmarelo";
import { useNavigate } from "react-router";

function VisualizarPlano() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul Text={"Plano de Aula"} />

      <div className="flex">
        <MenuLateral />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h1 className="text-4xl font-bold text-gray-800">
              2ª Guerra Mundial
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
              História • 2º Ensino Médio
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
                    2ª Guerra Mundial
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Disciplina</p>
                  <p className="font-semibold text-lg">
                    História
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Público-alvo</p>
                  <p className="font-semibold text-lg">
                    2º Ensino Médio
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="text-sm text-gray-500">Duração</p>
                  <p className="font-semibold text-lg">
                    2 aulas (100 minutos)
                  </p>
                </div>

              </div>
            </section>

            {/* Objetivo */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Objetivo da Aula
              </h2>

              <p className="text-gray-700 leading-7">
                Compreender as causas, os principais acontecimentos e as
                consequências da Segunda Guerra Mundial, analisando seus
                impactos políticos, econômicos e sociais para o mundo atual.
              </p>
            </section>

            {/* Conteúdo */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Conteúdo
              </h2>

              <p className="text-gray-700 leading-7">
                Causas da guerra, países envolvidos, Holocausto, bombas
                atômicas, conferências internacionais, fim do conflito e
                criação da ONU.
              </p>
            </section>

            {/* Metodologia */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Metodologia
              </h2>

              <p className="text-gray-700 leading-7">
                Aula expositiva com slides e vídeos, seguida de discussão em
                grupo e resolução de atividades relacionadas ao tema.
              </p>
            </section>

            {/* Recursos */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Recursos
              </h2>

              <p className="text-gray-700 leading-7">
                Projetor, computador, slides, mapa da Europa, livro didático e
                vídeo documental.
              </p>
            </section>

            {/* Avaliação */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Avaliação
              </h2>

              <p className="text-gray-700 leading-7">
                Participação nas discussões, resolução das atividades e análise
                crítica dos acontecimentos históricos.
              </p>
            </section>

            <div className="flex flex-wrap justify-end gap-4">
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

export default VisualizarPlano;