
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Pencil,
  Save,
  X,
  BookOpen,
  GraduationCap,
  Clock,
  Target,
  Lightbulb,
  ClipboardList,
  Package,
  FileText,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";

import {
  CampoTexto,
  CartaoInfo,
  exibirValor,
} from "../componentes/CampoEditavel";

import AulaApi from "../api/modelos/Aula";
import { useAuth } from "../contexts/AuthContext";

const CAMPOS_EDITAVEIS = [
  "titulo_da_aula",
  "materia",
  "turma",
  "duracao",
  "objetivos",
  "habilidades",
  "desenvolvimento",
  "metodologia",
  "materiais_necessarios",
  "criterios",
  "observacoes",
];

function TituloSecao({ icone: Icone, titulo, descricao }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 print:hidden">
        <Icone size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 md:text-xl">
          {titulo}
        </h2>

        {descricao && (
          <p className="text-sm text-gray-500">
            {descricao}
          </p>
        )}
      </div>
    </div>
  );
}

function VisualizarPlano() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [aula, setAula] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarAula() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await AulaApi.buscar(id);

        if (resposta.status === 404) {
          throw new Error("A aula selecionada não foi encontrada.");
        }

        if (resposta.status !== 200) {
          throw new Error("Não foi possível buscar a aula.");
        }

        if (ativo) {
          setAula(resposta.data);
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

  const podeEditar =
    usuario &&
    aula &&
    Number(aula.id_usuario) === Number(usuario.id);

  const dados = editando ? form : aula;

  function iniciarEdicao() {
    const copia = {};

    for (const campo of CAMPOS_EDITAVEIS) {
      copia[campo] = aula[campo] ?? "";
    }

    setForm(copia);
    setErroSalvar("");
    setMensagem("");
    setEditando(true);
  }

  function cancelarEdicao() {
    setEditando(false);
    setErroSalvar("");
    setMensagem("");
  }

  function alterar(campo, valor) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvar() {
    if (salvando) return;

    if (!String(form.titulo_da_aula ?? "").trim()) {
      setErroSalvar("O título da aula não pode ficar vazio.");
      return;
    }

    setSalvando(true);
    setErroSalvar("");
    setMensagem("");

    try {
      const resposta = await AulaApi.atualizar(id, {
        id_usuario: usuario.id,
        ...form,
      });

      if (resposta.status === 200) {
        setAula(resposta.data);
        setEditando(false);
        setMensagem("Alterações salvas com sucesso!");
      } else {
        setErroSalvar(
          resposta.data?.erro ||
          "Não foi possível salvar as alterações."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar aula:", error);

      setErroSalvar(
        "Não foi possível conectar ao servidor. Verifique se ele está rodando."
      );
    } finally {
      setSalvando(false);
    }
  }

  function exportarPDF() {
    if (editando || salvando) {
      setErroSalvar(
        "Salve ou cancele a edição antes de exportar."
      );
      return;
    }

    setErroSalvar("");
    window.print();
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <Clock size={20} className="animate-spin" />
          Carregando planejamento...
        </div>
      </div>
    );
  }

  if (erro || !aula) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="no-print">
          <MenuAzul Text="Visualizar Aula" />
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="mb-3 text-xl font-bold text-red-600">
            Não foi possível abrir a aula
          </h1>

          <p className="text-gray-600">
            {erro || "Aula não encontrada."}
          </p>

          <button
            onClick={() => navigate("/BibliotecaPrincipal")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Voltar à biblioteca
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F4F7FC] print:bg-white">

      {/* MENU */}
      <div className="no-print">
        <MenuAzul Text="Visualizar Aula" />
      </div>

      <div className="flex min-h-screen flex-col md:flex-row">

        <div className="no-print">
          <MenuLateral />
        </div>

        <main className="min-w-0 flex-1 p-4 md:p-8 print:p-0">

          {/* AÇÕES */}
          <div className="no-print mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-3">

            <button
              onClick={() => navigate("/BibliotecaPrincipal")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Voltar à biblioteca
            </button>

            {podeEditar && (
              editando ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={salvar}
                    disabled={salvando}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save size={17} />
                    {salvando ? "Salvando..." : "Salvar"}
                  </button>

                  <button
                    onClick={cancelarEdicao}
                    disabled={salvando}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <X size={17} />
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={iniciarEdicao}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Pencil size={17} />
                  Editar planejamento
                </button>
              )
            )}
          </div>

          {/* MENSAGENS */}
          <div className="no-print mx-auto max-w-5xl">
            {erroSalvar && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {erroSalvar}
              </div>
            )}

            {mensagem && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                <CheckCircle2 size={18} />
                {mensagem}
              </div>
            )}
          </div>

          {/* DOCUMENTO */}
          <div
            id="documento-aula-pdf"
            className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm print:max-w-none print:overflow-visible print:rounded-none print:border-0 print:shadow-none"
          >

            {/* CABEÇALHO */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-9 text-white md:px-10 md:py-12 print:bg-blue-800">

              <div className="relative z-10">

                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-100">
                  <BookOpen size={17} />
                  EDU+.IA • PLANEJAMENTO PEDAGÓGICO
                </div>

                <h1 className="mb-3 break-words text-2xl font-bold md:text-4xl">
                  {exibirValor(dados.titulo_da_aula)}
                </h1>

                <p className="text-blue-100 md:text-lg">
                  {exibirValor(dados.materia)} •{" "}
                  {exibirValor(dados.turma)}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                    <GraduationCap size={16} />
                    {exibirValor(dados.turma)}
                  </span>

                  <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                    <Clock size={16} />
                    {exibirValor(dados.duracao)}
                  </span>
                </div>
              </div>

              <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10 print:hidden" />

              <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5 print:hidden" />
            </div>

            {/* CONTEÚDO */}
            <div className="space-y-10 p-5 md:p-10 print:space-y-6 print:p-6">

              {/* INFORMAÇÕES */}
              <section>
                <TituloSecao
                  icone={GraduationCap}
                  titulo="Informações principais"
                  descricao="Identificação e organização da aula"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-2">
                  <CartaoInfo
                    rotulo="Título da aula"
                    valor={dados.titulo_da_aula}
                    editando={editando}
                    onChange={(v) => alterar("titulo_da_aula", v)}
                  />

                  <CartaoInfo
                    rotulo="Disciplina"
                    valor={dados.materia}
                    editando={editando}
                    onChange={(v) => alterar("materia", v)}
                  />

                  <CartaoInfo
                    rotulo="Turma"
                    valor={dados.turma}
                    editando={editando}
                    onChange={(v) => alterar("turma", v)}
                  />

                  <CartaoInfo
                    rotulo="Duração"
                    valor={dados.duracao}
                    editando={editando}
                    onChange={(v) => alterar("duracao", v)}
                  />
                </div>
              </section>

              <div className="border-t border-gray-100" />

              {/* OBJETIVOS */}
              <section>
                <TituloSecao
                  icone={Target}
                  titulo="Objetivos da aula"
                  descricao="Resultados de aprendizagem esperados"
                />

                <CampoTexto
                  titulo="Objetivos de aprendizagem"
                  valor={dados.objetivos}
                  editando={editando}
                  onChange={(v) => alterar("objetivos", v)}
                />
              </section>

              {/* HABILIDADES */}
              <section>
                <TituloSecao
                  icone={Lightbulb}
                  titulo="Habilidades"
                  descricao="Competências e habilidades trabalhadas"
                />

                <CampoTexto
                  titulo="Habilidades desenvolvidas"
                  valor={dados.habilidades}
                  editando={editando}
                  onChange={(v) => alterar("habilidades", v)}
                />
              </section>

              {/* DESENVOLVIMENTO */}
              <section>
                <TituloSecao
                  icone={BookOpen}
                  titulo="Conteúdo e desenvolvimento"
                  descricao="Etapas e organização do conteúdo pedagógico"
                />

                <CampoTexto
                  titulo="Desenvolvimento da aula"
                  valor={dados.desenvolvimento}
                  editando={editando}
                  onChange={(v) => alterar("desenvolvimento", v)}
                />
              </section>

              {/* METODOLOGIA */}
              <section>
                <TituloSecao
                  icone={ClipboardList}
                  titulo="Metodologia"
                  descricao="Estratégias e procedimentos de ensino"
                />

                <CampoTexto
                  titulo="Metodologia aplicada"
                  valor={dados.metodologia}
                  editando={editando}
                  onChange={(v) => alterar("metodologia", v)}
                />
              </section>

              {/* MATERIAIS */}
              <section>
                <TituloSecao
                  icone={Package}
                  titulo="Materiais e recursos"
                  descricao="Recursos utilizados durante a aula"
                />

                <CampoTexto
                  titulo="Materiais necessários"
                  valor={dados.materiais_necessarios}
                  editando={editando}
                  onChange={(v) => alterar("materiais_necessarios", v)}
                />
              </section>

              {/* AVALIAÇÃO */}
              <section>
                <TituloSecao
                  icone={ClipboardList}
                  titulo="Avaliação e critérios"
                  descricao="Acompanhamento da aprendizagem"
                />

                <CampoTexto
                  titulo="Critérios de avaliação"
                  valor={dados.criterios}
                  editando={editando}
                  onChange={(v) => alterar("criterios", v)}
                />
              </section>

              {/* OBSERVAÇÕES */}
              <section>
                <TituloSecao
                  icone={FileText}
                  titulo="Observações"
                  descricao="Informações complementares"
                />

                <CampoTexto
                  titulo="Observações adicionais"
                  valor={dados.observacoes}
                  editando={editando}
                  onChange={(v) => alterar("observacoes", v)}
                />
              </section>

              {/* RODAPÉ */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

                  <div>
                    <p className="font-semibold text-gray-700">
                      Planejamento pedagógico
                    </p>

                    <p className="text-xs text-gray-400">
                      Documento da plataforma Edu+.IA
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={exportarPDF}
                    disabled={editando || salvando}
                    className="no-print flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FileText size={18} />
                    Exportar em PDF
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default VisualizarPlano;
