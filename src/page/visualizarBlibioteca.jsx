import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Download, Printer } from "lucide-react";

import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";

import PlanejamentoApi from "../api/modelos/Planejamento";
import PlanejamentoConteudoApi from "../api/modelos/PlanejamentoConteudo";

function formatarData(dataISO) {
  if (!dataISO) return "Sem data";

  if (typeof dataISO === "string" && dataISO.includes("-")) {
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");

    if (ano && mes && dia) {
      return `${dia}/${mes}/${ano}`;
    }
  }

  const data = new Date(dataISO);

  if (Number.isNaN(data.getTime())) {
    return "Data inválida";
  }

  return data.toLocaleDateString("pt-BR");
}

function exibirValor(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Não informado";
  }

  if (Array.isArray(valor)) {
    return valor
      .map((item) =>
        typeof item === "object" && item !== null
          ? JSON.stringify(item, null, 2)
          : String(item)
      )
      .join(", ");
  }

  if (typeof valor === "object") {
    return JSON.stringify(valor, null, 2);
  }

  return String(valor);
}

function LinhaInformacao({ titulo, valor }) {
  return (
    <div className="grid grid-cols-1 border-b border-gray-100 last:border-b-0 sm:grid-cols-[220px_1fr]">
      <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-700 sm:border-r sm:border-gray-100 sm:text-right">
        {titulo}
      </div>

      <div className="whitespace-pre-wrap break-words px-4 py-3 text-sm leading-6 text-gray-700">
        {exibirValor(valor)}
      </div>
    </div>
  );
}

function Secao({ titulo, children }) {
  return (
    <section className="mb-8 break-inside-avoid sm:mb-10">
      <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
        {titulo}
      </h2>

      {children}
    </section>
  );
}

function VisualizarBiblioteca() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planejamento, setPlanejamento] = useState(null);
  const [conteudos, setConteudos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        setPlanejamento(null);
        setConteudos([]);

        if (!id) {
          throw new Error("O ID do planejamento não foi informado.");
        }

        const [respostaPlanejamento, respostaConteudos] =
          await Promise.all([
            PlanejamentoApi.buscar(id),
            PlanejamentoConteudoApi.listarPorPlanejamento(id),
          ]);

        if (respostaPlanejamento.status !== 200) {
          throw new Error("Não foi possível carregar o planejamento.");
        }

        if (respostaConteudos.status !== 200) {
          throw new Error(
            "Não foi possível carregar os conteúdos do planejamento."
          );
        }

        if (ativo) {
          setPlanejamento(respostaPlanejamento.data);
          setConteudos(
            Array.isArray(respostaConteudos.data)
              ? respostaConteudos.data
              : []
          );
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.message || "Ocorreu um erro ao carregar os dados."
          );
        }

        console.error("Erro ao carregar planejamento:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  function baixarPDF() {
    if (!planejamento) return;

    const tituloOriginal = document.title;

    document.title = `Planejamento - ${
      planejamento.materia || planejamento.turma || "Edu+.IA"
    }`;

    window.print();

    // Restaura o título da página após a janela de impressão.
    document.title = tituloOriginal;
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm;
          }

          html,
          body {
            background: #ffffff !important;
            color: #111827 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          body * {
            visibility: hidden !important;
          }

          #conteudo-planejamento-pdf,
          #conteudo-planejamento-pdf * {
            visibility: visible !important;
          }

          #conteudo-planejamento-pdf {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }

          #conteudo-planejamento-pdf .fundo-pdf {
            background: #ffffff !important;
          }

          #conteudo-planejamento-pdf .borda-pdf {
            border-color: #d1d5db !important;
          }

          #conteudo-planejamento-pdf .bloco-pdf {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          #conteudo-planejamento-pdf .tabela-pdf {
            overflow: visible !important;
          }

          #conteudo-planejamento-pdf .linha-conteudo-pdf {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .nao-imprimir {
            display: none !important;
          }
        }
      `}</style>

      <section className="min-h-screen bg-gray-50">
        <div className="nao-imprimir">
          <MenuAzul Text="Biblioteca" />
        </div>

        <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* Cabeçalho e botões */}
            <div className="nao-imprimir mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-sm font-medium text-blue-700">
                  Edu+.IA
                </p>

                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Visualizar planejamento
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Consulte ou salve seu planejamento pedagógico em PDF.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={baixarPDF}
                  disabled={carregando || !!erro || !planejamento}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download size={18} />
                  Baixar PDF
                </button>

                <BtnAzul
                  onClick={() => navigate("/BibliotecaPrincipal")}
                >
                  Voltar
                </BtnAzul>
              </div>
            </div>

            {/* Área que será salva como PDF */}
            <div id="conteudo-planejamento-pdf">
              {carregando ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16">
                  <div className="mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                  <p className="text-sm text-gray-500">
                    Carregando planejamento...
                  </p>
                </div>
              ) : erro ? (
                <div className="rounded-2xl border border-red-200 bg-white p-6">
                  <h2 className="mb-2 text-lg font-bold text-red-700">
                    Não foi possível abrir o planejamento
                  </h2>

                  <p className="text-sm leading-6 text-gray-600">
                    {erro}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/BibliotecaPrincipal")}
                    className="nao-imprimir mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Voltar para a biblioteca
                  </button>
                </div>
              ) : planejamento ? (
                <>
                  {/* Identificação */}
                  <div className="bloco-pdf fundo-pdf mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-blue-700">
                      <Printer size={20} />

                      <span className="text-sm font-semibold">
                        Edu+.IA — Planejamento pedagógico
                      </span>
                    </div>

                    <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                      {exibirValor(planejamento.materia)}
                    </span>

                    <h1 className="mt-4 break-words text-2xl font-bold text-gray-900 sm:text-3xl">
                      {exibirValor(planejamento.turma)}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      Planejamento pedagógico
                    </p>
                  </div>

                  {/* Informações gerais */}
                  <div className="bloco-pdf fundo-pdf mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                      <h2 className="text-lg font-bold text-gray-900">
                        Informações gerais
                      </h2>
                    </div>

                    <div>
                      <LinhaInformacao
                        titulo="Período"
                        valor={planejamento.periodo}
                      />

                      <LinhaInformacao
                        titulo="Organização"
                        valor={planejamento.trimestre}
                      />

                      <LinhaInformacao
                        titulo="Componentes curriculares"
                        valor={planejamento.componentes_curriculares}
                      />

                      <LinhaInformacao
                        titulo="Habilidades"
                        valor={planejamento.habilidades}
                      />

                      <LinhaInformacao
                        titulo="Objetivos"
                        valor={planejamento.objetivo}
                      />

                      <LinhaInformacao
                        titulo="Número total de aulas"
                        valor={planejamento.quantidade_de_aula}
                      />
                    </div>
                  </div>

                  {/* Planos e estratégias */}
                  <div className="fundo-pdf rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <Secao titulo="Planos e estratégias">
                      {conteudos.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
                          <p className="text-sm text-gray-500">
                            Nenhum plano ou estratégia cadastrado para este planejamento.
                          </p>
                        </div>
                      ) : (
                        <div className="tabela-pdf overflow-hidden rounded-xl border border-gray-200">
                          <div className="grid grid-cols-[110px_1fr] bg-blue-50 sm:grid-cols-[150px_1fr]">
                            <div className="border-r border-gray-200 px-3 py-3 text-center text-xs font-bold text-blue-800 sm:text-sm">
                              Aulas / Datas
                            </div>

                            <div className="px-3 py-3 text-sm font-bold text-blue-800">
                              Encaminhamentos pedagógicos
                            </div>
                          </div>

                          {conteudos.map((conteudo, index) => (
                            <div
                              key={conteudo.id_conteudo ?? index}
                              className="linha-conteudo-pdf grid grid-cols-[110px_1fr] border-t border-gray-200 sm:grid-cols-[150px_1fr]"
                            >
                              <div className="fundo-pdf flex items-start justify-center border-r border-gray-200 bg-gray-50 px-2 py-4 text-center text-xs font-medium text-gray-700 sm:text-sm">
                                {formatarData(conteudo.data)}
                              </div>

                              <div className="whitespace-pre-wrap break-words px-3 py-4 text-sm leading-6 text-gray-700">
                                {exibirValor(conteudo.titulo)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Secao>

                    {/* Processo avaliativo */}
                    <Secao titulo="Processo avaliativo">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="bloco-pdf rounded-xl border border-gray-200 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-blue-700">
                            Provas e trabalhos
                          </h3>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                            {exibirValor(planejamento.provas_trabalhos)}
                          </p>
                        </div>

                        <div className="bloco-pdf rounded-xl border border-gray-200 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-blue-700">
                            Tipo de avaliação
                          </h3>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                            {exibirValor(planejamento.formativa_somativa)}
                          </p>
                        </div>

                        <div className="bloco-pdf rounded-xl border border-gray-200 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-blue-700">
                            Critérios
                          </h3>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                            {exibirValor(planejamento.criterios)}
                          </p>
                        </div>
                      </div>
                    </Secao>

                    {/* Materiais e recursos */}
                    <Secao titulo="Materiais e recursos">
                      <div className="whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700">
                        {exibirValor(planejamento.materiais_necessarios)}
                      </div>
                    </Secao>

                    <p className="mt-5 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                      Edu+.IA — Apoio inteligente para o planejamento docente.
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            <p className="nao-imprimir mt-5 text-center text-xs text-gray-400">
              Clique em “Baixar PDF” e escolha “Salvar como PDF” na janela de impressão.
            </p>
          </div>
        </main>
      </section>
    </>
  );
}

export default VisualizarBiblioteca;