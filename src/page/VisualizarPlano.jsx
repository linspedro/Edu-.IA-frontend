import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Download, Printer } from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import BtnAzul from "../componentes/bntAzul";

import AulaApi from "../api/modelos/Aula";

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
      .join("\n");
  }

  if (typeof valor === "object") {
    return JSON.stringify(valor, null, 2);
  }

  return String(valor);
}

function Campo({ titulo, valor }) {
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
        {titulo}
      </h2>

      <div className="min-h-20 whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700 sm:text-base">
        {exibirValor(valor)}
      </div>
    </section>
  );
}

function Informacao({ titulo, valor }) {
  return (
    <div className="break-inside-avoid rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-medium text-gray-500">
        {titulo}
      </p>

      <p className="break-words text-base font-semibold text-gray-900">
        {exibirValor(valor)}
      </p>
    </div>
  );
}

function VisualizarPlano() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aula, setAula] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarAula() {
      try {
        setCarregando(true);
        setErro("");
        setAula(null);

        if (!id) {
          throw new Error("O ID da aula não foi informado na rota.");
        }

        const resposta = await AulaApi.listar();

        if (resposta.status !== 200) {
          throw new Error("Não foi possível buscar as aulas.");
        }

        const aulas = Array.isArray(resposta.data)
          ? resposta.data
          : [];

        const aulaEncontrada = aulas.find(
          (item) => String(item.id_aula) === String(id)
        );

        if (!aulaEncontrada) {
          throw new Error("A aula selecionada não foi encontrada.");
        }

        if (ativo) {
          setAula(aulaEncontrada);
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || "Erro ao carregar a aula.");
        }

        console.error("Erro ao visualizar aula:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarAula();

    return () => {
      ativo = false;
    };
  }, [id]);

  function baixarPDF() {
    if (!aula) return;

    document.title = `Plano de Aula - ${
      aula.titulo_da_aula || "Edu+.IA"
    }`;

    window.print();
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 16mm;
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

          #conteudo-plano-pdf,
          #conteudo-plano-pdf * {
            visibility: visible !important;
          }

          #conteudo-plano-pdf {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }

          #conteudo-plano-pdf .campo-pdf {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          #conteudo-plano-pdf .caixa-pdf {
            background: #ffffff !important;
            border-color: #d1d5db !important;
          }

          #conteudo-plano-pdf h1,
          #conteudo-plano-pdf h2,
          #conteudo-plano-pdf p,
          #conteudo-plano-pdf span,
          #conteudo-plano-pdf div {
            color: #111827;
          }

          .nao-imprimir {
            display: none !important;
          }
        }
      `}</style>

      <section className="min-h-screen bg-gray-50">
        <div className="nao-imprimir">
          <MenuAzul Text="Visualizar Aula" />
        </div>

        <div className="flex min-h-screen flex-col md:flex-row">
          <div className="nao-imprimir">
            <MenuLateral />
          </div>

          <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-5xl">
              {/* Cabeçalho e botões */}
              <div className="nao-imprimir mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-700">
                    Biblioteca
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Detalhes do plano de aula
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Consulte ou salve o plano de aula em PDF.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={baixarPDF}
                    disabled={carregando || !!erro || !aula}
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

              {/* Conteúdo que será impresso */}
              <div
                id="conteudo-plano-pdf"
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
              >
                {carregando ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <p className="text-sm text-gray-500">
                      Carregando aula...
                    </p>
                  </div>
                ) : erro ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                        !
                      </div>

                      <h2 className="text-lg font-bold text-red-800">
                        Não foi possível abrir a aula
                      </h2>
                    </div>

                    <p className="text-sm leading-6 text-red-700">
                      {erro}
                    </p>
                  </div>
                ) : aula ? (
                  <>
                    {/* Identificação */}
                    <div className="mb-8 break-inside-avoid border-b border-gray-200 pb-6">
                      <div className="mb-4 flex items-center gap-2 text-blue-700">
                        <Printer size={20} />

                        <span className="text-sm font-semibold">
                          Edu+.IA — Plano de aula
                        </span>
                      </div>

                      <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {exibirValor(aula.materia)}
                      </span>

                      <h1 className="mt-4 break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                        {exibirValor(aula.titulo_da_aula)}
                      </h1>

                      <p className="mt-3 text-sm text-gray-600">
                        Turma: {exibirValor(aula.turma)}
                      </p>
                    </div>

                    {/* Informações principais */}
                    <section className="mb-10">
                      <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                        Informações principais
                      </h2>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Informacao
                          titulo="Título da aula"
                          valor={aula.titulo_da_aula}
                        />

                        <Informacao
                          titulo="Disciplina"
                          valor={aula.materia}
                        />

                        <Informacao
                          titulo="Turma"
                          valor={aula.turma}
                        />

                        <Informacao
                          titulo="Duração"
                          valor={
                            aula.duracao
                              ? `${aula.duracao} minutos`
                              : "Não informado"
                          }
                        />
                      </div>
                    </section>

                    {/* Conteúdo pedagógico */}
                    <div className="border-t border-gray-100 pt-8">
                      <div className="campo-pdf">
                        <Campo
                          titulo="Objetivos da aula"
                          valor={aula.objetivos}
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Habilidades"
                          valor={aula.habilidades}
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Conteúdo e desenvolvimento"
                          valor={
                            aula.desenvolvimento ??
                            aula.conteudo ??
                            aula.tema
                          }
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Metodologia"
                          valor={aula.metodologia}
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Materiais e recursos"
                          valor={
                            aula.materiais_necessarios ??
                            aula.materiais ??
                            aula.recursos
                          }
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Avaliação e critérios"
                          valor={aula.criterios}
                        />
                      </div>

                      <div className="campo-pdf">
                        <Campo
                          titulo="Observações"
                          valor={aula.observacoes}
                        />
                      </div>
                    </div>

                    <p className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                      Edu+.IA — Apoio inteligente para o planejamento docente.
                    </p>
                  </>
                ) : null}
              </div>

              <p className="nao-imprimir mt-5 text-center text-xs text-gray-400">
                Ao clicar em “Baixar PDF”, selecione “Salvar como PDF” na janela de impressão.
              </p>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default VisualizarPlano;