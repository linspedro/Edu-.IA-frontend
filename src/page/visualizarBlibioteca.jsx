import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import TextGraident from "../componentes/textGraidient";
import PlanejamentoApi from "../api/modelos/Planejamento";
import PlanejamentoConteudoApi from "../api/modelos/PlanejamentoConteudo";


function formatarData(dataISO) {

  
  if (!dataISO) return "Sem data";

  // Se for formato AAAA-MM-DD
  if (typeof dataISO === "string" && dataISO.includes("-")) {
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const d = new Date(dataISO);
  if (isNaN(d.getTime())) return "Data inválida";
  return d.toLocaleDateString("pt-BR");
}

function VisualizarBiblioteca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planejamento, setPlanejamento] = useState(null);
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const respostaPlanejamento = await PlanejamentoApi.buscar(id);
      if (respostaPlanejamento.status === 200) {
        setPlanejamento(respostaPlanejamento.data);
      }

      const respostaConteudos =
        await PlanejamentoConteudoApi.listarPorPlanejamento(id);
      if (respostaConteudos.status === 200) {
        console.log("Conteúdos recebidos:", respostaConteudos.data); // <--- Adicione este log
        setConteudos(respostaConteudos.data);
      }
    }
    carregar();
  }, [id]);

  if (!planejamento) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <section className="min-h-screen bg-white">
      <MenuAzul Text={"Biblioteca"} />

      <div className="flex justify-center w-full py-6 md:py-10 px-4">
        <div className="bg-[#EAEAEA] w-full max-w-[900px] p-4 md:p-8 shadow-md rounded-lg">
          <div className="mb-4 md:mb-6">
            <BtnAzul
              children={"Voltar"}
              onClick={() => navigate("/BibliotecaPrincipal")}
            />
          </div>

          <div className="mb-6 md:mb-8">
            <TextGraident
              Texto={`${planejamento.materia} - ${planejamento.turma}`}
              TituloOuSubtitulo="titulo"
              tamanho={"22px md:28px"}
            />
          </div>

          <div className="border border-gray-400 text-sm overflow-x-auto">
            <div className="text-center font-bold text-blue-600 py-4 md:py-5 border-b border-gray-400 text-xs md:text-base">
              PLANO DE AULA MENSAL | TURMA
            </div>

            {[
              ["Período", planejamento.periodo],
              ["Organização:", planejamento.trimestre],
              [
                "Componentes curriculares:",
                planejamento.componentes_curriculares,
              ],
              ["Habilidades:", planejamento.habilidades],
              ["Objetivos:", planejamento.objetivo],
              ["Número total de aulas:", planejamento.quantidade_de_aula],
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

              {conteudos.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Nenhum plano/estratégia cadastrado para este planejamento.
                </div>
              ) : (
                conteudos.map((conteudo, index) => (
                  <div
                    key={conteudo.id_conteudo || index}
                    className="grid grid-cols-2 md:grid-cols-[120px_1fr]"
                  >
                    <div className="p-2 bg-[#9BD8FF] border-r border-gray-300 text-center">
                      {formatarData(conteudo.data)}
                    </div>
                    <div className="p-2 text-center">{conteudo.titulo}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <h2 className="text-center text-blue-600 font-bold text-xl md:text-2xl mb-4 md:mb-5">
              PROCESSO AVALIATIVO
            </h2>

            <div className="border border-gray-400 text-xs md:text-sm overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 text-center border-b border-gray-300">
                <div className="p-2 text-blue-700 border-b md:border-b-0 md:border-r border-gray-300">
                  PROVAS E TRABALHOS
                </div>
                <div className="p-2 text-blue-700 border-b md:border-b-0 md:border-r border-gray-300">
                  TIPO DE AVALIAÇÃO
                </div>
                <div className="p-2 text-blue-700">CRITÉRIOS</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2 border-b md:border-b-0 md:border-r border-gray-300">
                  {planejamento.provas_trabalhos}
                </div>
                <div className="p-2 border-b md:border-b-0 md:border-r border-gray-300">
                  {planejamento.formativa_somativa}
                </div>
                <div className="p-2">{planejamento.criterios}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <h2 className="text-center text-blue-600 font-bold text-xl md:text-2xl mb-4 md:mb-5">
              MATERIAIS E RECURSOS
            </h2>

            <div className="border border-gray-400 text-sm overflow-x-auto p-2">
              {planejamento.materiais_necessarios}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <BtnAmarelo children={"Exportar em PDF"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualizarBiblioteca;
