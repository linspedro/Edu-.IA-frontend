
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Download } from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import BtnAzul from "../componentes/bntAzul";

import AtividadeApi from "../api/modelos/Atividade";

function exibirValor(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Não informado";
  }

  return String(valor);
}

function Campo({ titulo, valor }) {
  return (
    <section className="campo-pdf mb-8">
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
    <div className="campo-pdf rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-medium text-gray-500">
        {titulo}
      </p>

      <p className="break-words text-base font-semibold text-gray-900">
        {exibirValor(valor)}
      </p>
    </div>
  );
}

function VisualizarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [atividade, setAtividade] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarAtividade() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await AtividadeApi.buscar(id);

        if (resposta.status === 404) {
          throw new Error("A atividade selecionada não foi encontrada.");
        }

        if (resposta.status !== 200) {
          throw new Error("Não foi possível buscar a atividade.");
        }

        if (ativo) {
          setAtividade(resposta.data);
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || "Erro ao carregar a atividade.");
        }

        console.error("Erro ao visualizar atividade:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarAtividade();

    return () => {
      ativo = false;
    };
  }, [id]);

  function baixarPDF() {
    if (!atividade || carregando || erro) return;

    const tituloOriginal = document.title;

    document.title = `Atividade - ${
      atividade.titulo_da_atividade || "Edu+.IA"
    }`;

    const restaurarTitulo = () => {
      document.title = tituloOriginal;
      window.removeEventListener("afterprint", restaurarTitulo);
    };

    window.addEventListener("afterprint", restaurarTitulo);

    window.print();

    // Segurança caso o navegador não dispare o evento afterprint.
    setTimeout(restaurarTitulo, 1000);
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <style>{`
        @page {
          size: A4;
          margin: 15mm;
        }

        @media print {
          html,
          body {
            background: white !important;
            color: #111827 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * {
            visibility: hidden !important;
          }

          #conteudo-atividade-pdf,
          #conteudo-atividade-pdf * {
            visibility: visible !important;
          }

          #conteudo-atividade-pdf {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }

          .nao-imprimir {
            display: none !important;
          }

          .campo-pdf {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          #conteudo-atividade-pdf h1,
          #conteudo-atividade-pdf h2 {
            color: #111827 !important;
          }

          #conteudo-atividade-pdf .fundo-pdf {
            background: #f9fafb !important;
          }

          #conteudo-atividade-pdf .borda-pdf {
            border-color: #d1d5db !important;
          }
        }
      `}</style>

      <div className="nao-imprimir">
        <MenuAzul Text="Visualizar Atividade" />
      </div>

      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="nao-imprimir">
          <MenuLateral />
        </div>

        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-5xl">
            {/* Cabeçalho e ações */}
            <div className="nao-imprimir mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-sm font-medium text-blue-700">
                  Biblioteca
                </p>

                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Detalhes da atividade
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Consulte as informações e orientações da atividade.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={baixarPDF}
                  disabled={carregando || !!erro || !atividade}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download size={18} />
                  Baixar PDF
                </button>

                <BtnAzul onClick={() => navigate("/BibliotecaPrincipal")}>
                  Voltar
                </BtnAzul>
              </div>
            </div>

            {/* Conteúdo da atividade */}
            <div
              id="conteudo-atividade-pdf"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
            >
              {carregando ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                  <p className="text-sm text-gray-500">
                    Carregando atividade...
                  </p>
                </div>
              ) : erro ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                      !
                    </div>

                    <h2 className="text-lg font-bold text-red-800">
                      Não foi possível abrir a atividade
                    </h2>
                  </div>

                  <p className="text-sm leading-6 text-red-700">
                    {erro}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-600">
                    Confira se a atividade existe e se o ID está correto na URL.
                  </p>
                </div>
              ) : atividade ? (
                <>
                  {/* Identificação */}
                  <div className="campo-pdf mb-8 border-b border-gray-100 pb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                      Edu+.IA — Atividade pedagógica
                    </p>

                    <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                      {exibirValor(atividade.materia)}
                    </span>

                    <h1 className="mt-4 break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                      {exibirValor(atividade.titulo_da_atividade)}
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                      Público-alvo: {exibirValor(atividade.turma)}
                    </p>
                  </div>

                  {/* Informações principais */}
                  <section className="mb-10">
                    <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                      Informações principais
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Informacao
                        titulo="Título"
                        valor={atividade.titulo_da_atividade}
                      />

                      <Informacao
                        titulo="Disciplina"
                        valor={atividade.materia}
                      />

                      <Informacao
                        titulo="Público-alvo"
                        valor={atividade.turma}
                      />

                      <Informacao
                        titulo="Duração estimada"
                        valor={atividade.duracao}
                      />
                    </div>
                  </section>

                  {/* Detalhes */}
                  <div className="border-t border-gray-100 pt-8">
                    <Campo
                      titulo="Objetivo da atividade"
                      valor={atividade.objetivo}
                    />

                    <Campo
                      titulo="Descrição da atividade"
                      valor={atividade.descricao}
                    />

                    <Campo
                      titulo="Observações"
                      valor={atividade.observacoes}
                    />
                  </div>

                  <footer className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
                    Edu+.IA — Apoio inteligente para o planejamento docente.
                  </footer>
                </>
              ) : null}
            </div>

            <p className="nao-imprimir mt-5 text-center text-xs text-gray-400">
              Edu+.IA — Apoio inteligente para o planejamento docente.
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}

export default VisualizarAtividade;
