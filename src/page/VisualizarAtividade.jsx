
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  Target,
  FileText,
  Lightbulb,
  Pencil,
  Save,
  X,
  Download,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";

import {
  CampoTexto,
  CartaoInfo,
  exibirValor,
} from "../componentes/CampoEditavel";

import AtividadeApi from "../api/modelos/Atividade";
import { useAuth } from "../contexts/AuthContext";

const CAMPOS_EDITAVEIS = [
  "titulo_da_atividade",
  "materia",
  "turma",
  "duracao",
  "objetivo",
  "descricao",
  "observacoes",
];

function Secao({ titulo, icone: Icon, children }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-3 border-b border-blue-100 pb-3">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
          <Icon size={21} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

function VisualizarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [atividade, setAtividade] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagem, setMensagem] = useState("");

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

  const podeEditar =
    usuario &&
    atividade &&
    Number(atividade.id_usuario) === Number(usuario.id);

  const dados = editando ? form : atividade;

  function iniciarEdicao() {
    const copia = {};

    for (const campo of CAMPOS_EDITAVEIS) {
      copia[campo] = atividade[campo] ?? "";
    }

    setForm(copia);
    setErroSalvar("");
    setMensagem("");
    setEditando(true);
  }

  function cancelarEdicao() {
    setEditando(false);
    setErroSalvar("");
  }

  function alterar(campo, valor) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvar() {
    if (salvando) return;

    const obrigatorios = [
      "titulo_da_atividade",
      "materia",
      "turma",
      "duracao",
      "objetivo",
      "descricao",
    ];

    for (const campo of obrigatorios) {
      if (!String(form[campo] ?? "").trim()) {
        setErroSalvar("Só as observações podem ficar vazias.");
        return;
      }
    }

    setSalvando(true);
    setErroSalvar("");
    setMensagem("");

    try {
      const resposta = await AtividadeApi.atualizar(id, {
        id_usuario: usuario.id,
        ...form,
      });

      if (resposta.status === 200) {
        setAtividade(resposta.data);
        setEditando(false);
        setMensagem("Alterações salvas com sucesso.");
      } else {
        setErroSalvar(
          resposta.data?.erro || "Não foi possível salvar as alterações."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar atividade:", error);
      setErroSalvar(
        "Não foi possível conectar ao servidor. Verifique se ele está rodando."
      );
    } finally {
      setSalvando(false);
    }
  }

  function exportarPDF() {
    if (editando || salvando) {
      setErroSalvar("Salve ou cancele a edição antes de exportar.");
      return;
    }

    window.print();
  }

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="no-print">
        <MenuAzul Text="Visualizar Atividade" />
      </div>

      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="no-print">
          <MenuLateral />
        </div>

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-5xl">

            <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate("/BibliotecaPrincipal")}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
                Voltar
              </button>

              {atividade && podeEditar && (
                <div className="flex flex-wrap gap-2">
                  {editando ? (
                    <>
                      <button
                        type="button"
                        onClick={salvar}
                        disabled={salvando}
                        className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
                      >
                        <Save size={18} />
                        {salvando ? "Salvando..." : "Salvar"}
                      </button>

                      <button
                        type="button"
                        onClick={cancelarEdicao}
                        disabled={salvando}
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <X size={18} />
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={iniciarEdicao}
                      className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800"
                    >
                      <Pencil size={18} />
                      Editar atividade
                    </button>
                  )}
                </div>
              )}
            </div>

            {erroSalvar && (
              <div className="no-print mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {erroSalvar}
              </div>
            )}

            {mensagem && (
              <div className="no-print mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {mensagem}
              </div>
            )}

            {carregando ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                <p className="text-gray-600">Carregando atividade...</p>
              </div>
            ) : erro ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                <h1 className="mb-2 text-xl font-bold">
                  Não foi possível abrir a atividade
                </h1>
                <p>{erro}</p>
                <p className="mt-2 text-sm">
                  Confira se a atividade existe e se o ID está correto na URL.
                </p>
              </div>
            ) : atividade && dados ? (
              <>
                <article
                  id="documento-atividade-pdf"
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  {/* Cabeçalho do documento */}
                  <header className="bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-9 text-white md:px-10">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-xl bg-white/15 p-3">
                        <BookOpen size={28} />
                      </div>

                      <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                          Edu+.IA
                        </p>
                        <p className="text-sm text-blue-100">
                          Planejamento de atividades
                        </p>
                      </div>
                    </div>

                    <h1 className="break-words text-3xl font-bold leading-tight md:text-4xl">
                      {exibirValor(dados.titulo_da_atividade)}
                    </h1>

                    <p className="mt-3 text-blue-100">
                      {exibirValor(dados.materia)} •{" "}
                      {exibirValor(dados.turma)}
                    </p>
                  </header>

                  <div className="p-6 md:p-10">
                    <Secao titulo="Informações principais" icone={ClipboardList}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <CartaoInfo
                          rotulo="Título da atividade"
                          valor={dados.titulo_da_atividade}
                          editando={editando}
                          onChange={(v) =>
                            alterar("titulo_da_atividade", v)
                          }
                        />

                        <CartaoInfo
                          rotulo="Disciplina"
                          valor={dados.materia}
                          editando={editando}
                          onChange={(v) => alterar("materia", v)}
                        />

                        <CartaoInfo
                          rotulo="Público-alvo"
                          valor={dados.turma}
                          editando={editando}
                          onChange={(v) => alterar("turma", v)}
                        />

                        <CartaoInfo
                          rotulo="Duração estimada"
                          valor={dados.duracao}
                          editando={editando}
                          onChange={(v) => alterar("duracao", v)}
                        />
                      </div>
                    </Secao>

                    <Secao titulo="Objetivo da atividade" icone={Target}>
                      <CampoTexto
                        titulo="Objetivo"
                        valor={dados.objetivo}
                        editando={editando}
                        onChange={(v) => alterar("objetivo", v)}
                      />
                    </Secao>

                    <Secao titulo="Desenvolvimento da atividade" icone={Lightbulb}>
                      <CampoTexto
                        titulo="Descrição"
                        valor={dados.descricao}
                        editando={editando}
                        onChange={(v) => alterar("descricao", v)}
                      />
                    </Secao>

                    <Secao titulo="Observações complementares" icone={MessageSquare}>
                      <CampoTexto
                        titulo="Observações"
                        valor={dados.observacoes}
                        editando={editando}
                        onChange={(v) => alterar("observacoes", v)}
                      />
                    </Secao>

                    <footer className="mt-10 border-t border-gray-200 pt-5 text-center text-sm text-gray-400">
                      Edu+.IA — Plataforma Inteligente de Apoio ao Planejamento Docente
                    </footer>
                  </div>
                </article>

                <div className="no-print mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={exportarPDF}
                    disabled={editando || salvando}
                    className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download size={19} />
                    Exportar PDF
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </section>
  );
}

export default VisualizarAtividade;
