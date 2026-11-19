
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
  CalendarDays,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Package,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";

import MenuAzul from "../componentes/MenuAzul";
import { exibirValor } from "../componentes/CampoEditavel";
import PlanejamentoApi from "../api/modelos/Planejamento";
import PlanejamentoConteudoApi from "../api/modelos/PlanejamentoConteudo";
import { useAuth } from "../contexts/AuthContext";

const CAMPOS = [
  "periodo",
  "trimestre",
  "turma",
  "materia",
  "componentes_curriculares",
  "habilidades",
  "objetivo",
  "quantidade_de_aula",
  "provas_trabalhos",
  "formativa_somativa",
  "criterios",
  "materiais_necessarios",
];

const LINHAS = [
  ["Período", "periodo", "linha"],
  ["Organização", "trimestre", "linha"],
  ["Turma", "turma", "linha"],
  ["Disciplina", "materia", "linha"],
  ["Componentes curriculares", "componentes_curriculares", "texto"],
  ["Habilidades", "habilidades", "texto"],
  ["Objetivos", "objetivo", "texto"],
  ["Número total de aulas", "quantidade_de_aula", "numero"],
];

function formatarData(valor) {
  if (!valor) return "";

  const [ano, mes, dia] = String(valor).slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

function Editavel({ valor, editando, onChange, tipo = "texto" }) {
  if (!editando) {
    return (
      <div className="whitespace-pre-wrap break-words text-gray-700 leading-relaxed">
        {exibirValor(valor)}
      </div>
    );
  }

  const classes =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  if (tipo === "linha" || tipo === "numero") {
    return (
      <input
        type={tipo === "numero" ? "number" : "text"}
        min={tipo === "numero" ? 0 : undefined}
        value={valor ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={classes}
      />
    );
  }

  return (
    <textarea
      value={valor ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={`${classes} min-h-[110px] resize-y`}
    />
  );
}

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
          <p className="text-sm text-gray-500">{descricao}</p>
        )}
      </div>
    </div>
  );
}

function CampoDocumento({ rotulo, children }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 print:rounded-none print:border-gray-300">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">
        {rotulo}
      </p>

      {children}
    </div>
  );
}

function VisualizarBiblioteca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [planejamento, setPlanejamento] = useState(null);
  const [conteudos, setConteudos] = useState([]);

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [formConteudos, setFormConteudos] = useState([]);

  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setCarregando(true);

        const respostaPlanejamento = await PlanejamentoApi.buscar(id);

        if (!ativo) return;

        if (respostaPlanejamento.status === 200) {
          setPlanejamento(respostaPlanejamento.data);
        }

        const respostaConteudos =
          await PlanejamentoConteudoApi.listarPorPlanejamento(id);

        if (!ativo) return;

        if (respostaConteudos.status === 200) {
          setConteudos(respostaConteudos.data);
        }
      } catch (erro) {
        console.error("Erro ao carregar planejamento:", erro);

        if (ativo) {
          setErroSalvar("Não foi possível carregar o planejamento.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  function exportarPDF() {
    if (editando || salvando) {
      setErroSalvar("Salve ou cancele a edição antes de exportar.");
      return;
    }

    setErroSalvar("");
    window.print();
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <Clock className="animate-spin" size={20} />
          Carregando planejamento...
        </div>
      </div>
    );
  }

  if (!planejamento) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-600">
          {erroSalvar || "Planejamento não encontrado."}
        </p>

        <button
          onClick={() => navigate("/BibliotecaPrincipal")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Voltar à biblioteca
        </button>
      </div>
    );
  }

  const podeEditar =
    usuario &&
    Number(planejamento.id_usuario) === Number(usuario.id);

  const dados = editando ? form : planejamento;

  function iniciarEdicao() {
    const copia = {};

    for (const campo of CAMPOS) {
      copia[campo] = planejamento[campo] ?? "";
    }

    setForm(copia);

    setFormConteudos(
      conteudos.map((c) => ({
        titulo: c.titulo ?? "",
        data: String(c.data ?? "").slice(0, 10),
      }))
    );

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

  function alterarConteudo(indice, campo, valor) {
    setFormConteudos((atual) =>
      atual.map((item, i) =>
        i === indice
          ? { ...item, [campo]: valor }
          : item
      )
    );
  }

  function adicionarConteudo() {
    setFormConteudos((atual) => [
      ...atual,
      { titulo: "", data: "" },
    ]);
  }

  function removerConteudo(indice) {
    setFormConteudos((atual) =>
      atual.filter((_, i) => i !== indice)
    );
  }

  async function salvar() {
    if (salvando) return;

    for (const obrigatorio of ["turma", "materia", "trimestre"]) {
      if (!String(form[obrigatorio] ?? "").trim()) {
        setErroSalvar(
          "Turma, disciplina e organização não podem ficar vazias."
        );
        return;
      }
    }

    for (const item of formConteudos) {
      if (!item.titulo.trim() || !item.data) {
        setErroSalvar("Cada aula precisa de data e título.");
        return;
      }
    }

    setSalvando(true);
    setErroSalvar("");
    setMensagem("");

    try {
      const respostaPlano = await PlanejamentoApi.atualizar(id, {
        id_usuario: usuario.id,
        ...form,
      });

      if (respostaPlano.status !== 200) {
        setErroSalvar(
          respostaPlano.data?.erro ||
            "Não foi possível salvar as alterações."
        );
        return;
      }

      setPlanejamento(respostaPlano.data);

      const respostaConteudos =
        await PlanejamentoConteudoApi.substituir(id, {
          id_usuario: usuario.id,
          conteudos: formConteudos,
        });

      if (respostaConteudos.status !== 200) {
        setErroSalvar(
          "Os dados gerais foram salvos, mas as aulas não: " +
            (respostaConteudos.data?.erro || "tente novamente.")
        );
        return;
      }

      setConteudos(respostaConteudos.data);
      setEditando(false);
      setMensagem("Alterações salvas com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar:", erro);

      setErroSalvar(
        "Não foi possível conectar ao servidor."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#F4F7FC] print:bg-white">
      <div className="no-print">
        <MenuAzul Text="Biblioteca" />
      </div>

      <main className="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-12 print:max-w-none print:p-0">

        {/* AÇÕES */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/BibliotecaPrincipal")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Voltar à biblioteca
          </button>

          {podeEditar &&
            (editando ? (
              <div className="flex gap-2">
                <button
                  onClick={salvar}
                  disabled={salvando}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
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
            ))}
        </div>

        {/* MENSAGENS */}
        {erroSalvar && (
          <div className="no-print mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {erroSalvar}
          </div>
        )}

        {mensagem && (
          <div className="no-print mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {mensagem}
          </div>
        )}

        {/* DOCUMENTO */}
        <div
          id="documento-pdf"
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm print:overflow-visible print:rounded-none print:border-0 print:shadow-none"
        >

          {/* CABEÇALHO */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-9 text-white md:px-10 md:py-12 print:bg-blue-800">
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-100">
                <BookOpen size={17} />
                BIBLIOTECA DE PLANEJAMENTOS
              </div>

              <h1 className="mb-3 text-2xl font-bold md:text-4xl">
                {dados.materia || "Planejamento"}
              </h1>

              <p className="text-blue-100 md:text-lg">
                Planejamento pedagógico •{" "}
                {dados.turma || "Turma não informada"}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  {dados.trimestre || "Organização não informada"}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                  <CalendarDays size={15} />
                  {dados.periodo || "Período não informado"}
                </span>
              </div>
            </div>

            <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10 print:hidden" />
            <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5 print:hidden" />
          </div>

          <div className="space-y-10 p-5 md:p-10 print:space-y-6 print:p-5">

            {/* IDENTIFICAÇÃO */}
            <section>
              <TituloSecao
                icone={GraduationCap}
                titulo="Identificação do planejamento"
                descricao="Informações gerais e organização pedagógica"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-2">
                {LINHAS.map(([rotulo, campo, tipo]) => (
                  <CampoDocumento key={campo} rotulo={rotulo}>
                    <Editavel
                      valor={dados[campo]}
                      editando={editando}
                      tipo={tipo}
                      onChange={(v) => alterar(campo, v)}
                    />
                  </CampoDocumento>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* PLANOS */}
            <section>
              <TituloSecao
                icone={BookOpen}
                titulo="Planos e estratégias"
                descricao="Componentes, habilidades e desenvolvimento das aulas"
              />

              <div className="space-y-5">
                <CampoDocumento rotulo="Componentes curriculares">
                  <Editavel
                    valor={dados.componentes_curriculares}
                    editando={editando}
                    onChange={(v) =>
                      alterar("componentes_curriculares", v)
                    }
                  />
                </CampoDocumento>

                <CampoDocumento rotulo="Habilidades">
                  <Editavel
                    valor={dados.habilidades}
                    editando={editando}
                    onChange={(v) => alterar("habilidades", v)}
                  />
                </CampoDocumento>

                <CampoDocumento rotulo="Objetivos de aprendizagem">
                  <Editavel
                    valor={dados.objetivo}
                    editando={editando}
                    onChange={(v) => alterar("objetivo", v)}
                  />
                </CampoDocumento>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* CRONOGRAMA */}
            <section>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <TituloSecao
                  icone={CalendarDays}
                  titulo="Cronograma de aulas"
                  descricao="Organização dos encaminhamentos pedagógicos"
                />

                {editando && (
                  <button
                    onClick={adicionarConteudo}
                    className="no-print flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    <Plus size={17} />
                    Adicionar aula
                  </button>
                )}
              </div>

              {editando ? (
                <div className="space-y-4">
                  {formConteudos.length === 0 && (
                    <p className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-gray-400">
                      Nenhuma aula adicionada.
                    </p>
                  )}

                  {formConteudos.map((item, indice) => (
                    <div
                      key={indice}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-bold text-blue-700">
                          Aula {indice + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => removerConteudo(indice)}
                          className="no-print flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                          Remover
                        </button>
                      </div>

                      <label className="mb-2 block text-sm font-semibold text-gray-600">
                        Data da aula
                      </label>

                      <input
                        type="date"
                        value={item.data}
                        onChange={(e) =>
                          alterarConteudo(indice, "data", e.target.value)
                        }
                        className="mb-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />

                      <label className="mb-2 block text-sm font-semibold text-gray-600">
                        Nome e desenvolvimento do conteúdo
                      </label>

                      <textarea
                        value={item.titulo}
                        onChange={(e) =>
                          alterarConteudo(indice, "titulo", e.target.value)
                        }
                        className="min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {conteudos.length === 0 ? (
                    <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-400">
                      Nenhuma aula cadastrada.
                    </p>
                  ) : (
                    conteudos.map((conteudo, indice) => (
                      <div
                        key={conteudo.id_conteudo}
                        className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-5 print:rounded-none print:border-gray-300 print:bg-white"
                      >
                        <div className="flex w-[65px] shrink-0 flex-col items-center justify-center rounded-xl bg-blue-600 py-3 text-white print:bg-blue-800">
                          <span className="text-xs font-medium text-blue-100">
                            AULA
                          </span>
                          <span className="text-2xl font-bold">
                            {indice + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-blue-700">
                            <CalendarDays size={16} />
                            {formatarData(conteudo.data)}
                          </div>

                          <div className="whitespace-pre-wrap break-words leading-relaxed text-gray-700">
                            {exibirValor(conteudo.titulo)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>

            <div className="border-t border-gray-100" />

            {/* AVALIAÇÃO */}
            <section>
              <TituloSecao
                icone={ClipboardList}
                titulo="Processo avaliativo"
                descricao="Instrumentos, modalidades e critérios de avaliação"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 print:grid-cols-3">
                <CampoDocumento rotulo="Provas e trabalhos">
                  <Editavel
                    valor={dados.provas_trabalhos}
                    editando={editando}
                    onChange={(v) => alterar("provas_trabalhos", v)}
                  />
                </CampoDocumento>

                <CampoDocumento rotulo="Tipo de avaliação">
                  <Editavel
                    valor={dados.formativa_somativa}
                    editando={editando}
                    onChange={(v) => alterar("formativa_somativa", v)}
                  />
                </CampoDocumento>

                <CampoDocumento rotulo="Critérios">
                  <Editavel
                    valor={dados.criterios}
                    editando={editando}
                    onChange={(v) => alterar("criterios", v)}
                  />
                </CampoDocumento>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* MATERIAIS */}
            <section>
              <TituloSecao
                icone={Package}
                titulo="Materiais e recursos"
                descricao="Recursos necessários para o desenvolvimento das aulas"
              />

              <CampoDocumento rotulo="Materiais necessários">
                <Editavel
                  valor={dados.materiais_necessarios}
                  editando={editando}
                  onChange={(v) => alterar("materiais_necessarios", v)}
                />
              </CampoDocumento>
            </section>

            {/* RODAPÉ */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div>
                  <p className="font-semibold text-gray-700">
                    Planejamento pedagógico
                  </p>

                  <p className="text-xs text-gray-400">
                    Documento da biblioteca Edu+.IA
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
    </section>
  );
}

export default VisualizarBiblioteca;
