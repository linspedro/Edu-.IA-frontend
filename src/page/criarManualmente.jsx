
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Plus,
  Trash2,
  Target,
  Layers3,
  Package,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Save,
} from "lucide-react";

import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import Input from "../componentes/input";
import BtnAzul from "../componentes/bntAzul";
import { useAuth } from "../contexts/AuthContext";

import PlanejamentoApi from "../api/modelos/Planejamento";
import PlanejamentoConteudoApi from "../api/modelos/PlanejamentoConteudo";

function CampoTexto({
  titulo,
  placeholder,
  registerProps,
  obrigatorio = false,
  linhas = 4,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {titulo}
        {obrigatorio && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
        {...registerProps}
        placeholder={placeholder}
        rows={linhas}
        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

function SecaoFormulario({ icone: Icone, numero, titulo, descricao, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0F4C81]">
          <Icone size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Etapa {numero}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            {titulo}
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {descricao}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-7">{children}</div>
    </section>
  );
}

function CriarManualmente() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [notificacao, setNotificacao] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: {
      periodo: "",
      turma: "",
      disciplina: "",
      trimestre: "",
      componentes: "",
      habilidades: "",
      objetivos: "",
      quantidadeAulas: "",
      aulas: [],
      avaliacoes: "",
      tipoAvaliacao: "",
      criterios: "",
      materiais: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "aulas",
  });

  function mostrarNotificacao(tipo, mensagem) {
    setNotificacao({ tipo, mensagem });

    setTimeout(() => {
      setNotificacao(null);
    }, 4000);
  }

  const onSubmit = async (dados) => {
    if (!usuario?.id) {
      mostrarNotificacao("erro", "Sua sessão não foi identificada. Entre novamente.");
      return;
    }

    setSalvando(true);
    setNotificacao(null);

    try {
      const respostaPlanejamento = await PlanejamentoApi.criar({
        idusuario: usuario.id,
        periodo: dados.periodo,
        turma: dados.turma,
        materia: dados.disciplina,
        trimestre: dados.trimestre,
        componentesCurriculares: dados.componentes,
        habilidades: dados.habilidades,
        objetivos: dados.objetivos,
        quantidadeDeAulas: dados.quantidadeAulas,
        provasETrabalhos: dados.avaliacoes,
        formativaSomativa: dados.tipoAvaliacao,
        criterios: dados.criterios,
        materiaisNecessarios: dados.materiais,
      });

      if (respostaPlanejamento.status !== 201) {
        throw new Error(
          respostaPlanejamento.data?.mensagem ||
            respostaPlanejamento.data?.erro ||
            "Não foi possível criar o planejamento."
        );
      }

      const idPlanejamentoCriado =
        respostaPlanejamento.data.id_planejamento;

      for (const aula of dados.aulas || []) {
        const respostaAula = await PlanejamentoConteudoApi.criar({
          id_planejamento: idPlanejamentoCriado,
          titulo: aula.encaminhamentoPedagogico,
          data: aula.data,
        });

        if (
          respostaAula.status < 200 ||
          respostaAula.status >= 300
        ) {
          throw new Error(
            "O planejamento foi criado, mas houve um problema ao salvar uma das aulas."
          );
        }
      }

      mostrarNotificacao(
        "sucesso",
        "Planejamento criado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao criar planejamento:", error);

      mostrarNotificacao(
        "erro",
        error.message || "Ocorreu um erro ao salvar o planejamento."
      );
    } finally {
      setSalvando(false);
    }
  };

  const quantidadeAulasInformada = watch("quantidadeAulas");

  return (
    <section className="min-h-screen bg-[#F4F7FB]">
      {/* Notificação */}
      {notificacao && (
        <div
          role="status"
          className={`fixed right-4 top-4 z-[120] flex max-w-[calc(100%-2rem)] items-start gap-3 rounded-2xl border p-4 shadow-xl sm:right-6 sm:top-6 sm:max-w-md ${
            notificacao.tipo === "sucesso"
              ? "border-emerald-200 bg-white text-emerald-800"
              : "border-red-200 bg-white text-red-800"
          }`}
        >
          {notificacao.tipo === "sucesso" ? (
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={22} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0 text-red-500" size={22} />
          )}

          <div>
            <p className="text-sm font-bold">
              {notificacao.tipo === "sucesso" ? "Tudo certo!" : "Atenção"}
            </p>
            <p className="mt-1 text-sm leading-5">
              {notificacao.mensagem}
            </p>
          </div>

          <button
            type="button"
            aria-label="Fechar notificação"
            onClick={() => setNotificacao(null)}
            className="ml-2 text-lg leading-none opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      <MenuAzul Text="Cronogramas" />

      <div className="flex w-full flex-col md:flex-row">
        <MenuLateral />

        <main className="min-w-0 flex-1 px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pt-8">
          <div className="mx-auto max-w-5xl">
            {/* Voltar */}
            <button
              type="button"
              onClick={() => navigate("/PlanejarPrincipal")}
              className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-[#0F4C81]"
            >
              <ArrowLeft size={18} />
              Voltar aos planejamentos
            </button>

            {/* Cabeçalho */}
            <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4C81] to-[#1766A3] p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border-[28px] border-white/[0.06]" />
              <div className="pointer-events-none absolute -bottom-20 right-28 h-48 w-48 rounded-full bg-white/[0.04]" />

              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50">
                    <BookOpen size={15} />
                    Planejamento manual
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Criar planejamento
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                    Organize os conteúdos, objetivos e estratégias das suas aulas em um só lugar.
                  </p>
                </div>

                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:flex">
                  <GraduationCap size={42} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Formulário */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Etapa 1 */}
              <SecaoFormulario
                numero="01"
                icone={Layers3}
                titulo="Informações principais"
                descricao="Defina o período, a turma e a disciplina do planejamento."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Período <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("periodo", { required: true })}
                      placeholder="Ex.: Janeiro/2026"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Turma <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("turma", { required: true })}
                      placeholder="Ex.: 3º Ano A"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Disciplina <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("disciplina", { required: true })}
                      placeholder="Ex.: Matemática"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Trimestre <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("trimestre", { required: true })}
                      placeholder="Ex.: 1º Trimestre"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Quantidade de aulas <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("quantidadeAulas", {
                        required: true,
                        min: 1,
                      })}
                      type="number"
                      placeholder="Ex.: 8"
                    />
                    <p className="text-xs text-slate-400">
                      Informe a quantidade total prevista para o período.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <div className="mb-5 flex items-center gap-2">
                    <Target size={18} className="text-blue-600" />
                    <h3 className="font-bold text-slate-800">
                      Componentes pedagógicos
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    <CampoTexto
                      titulo="Componentes curriculares"
                      placeholder="Descreva os componentes curriculares..."
                      registerProps={register("componentes")}
                    />

                    <CampoTexto
                      titulo="Habilidades"
                      placeholder="Quais habilidades os estudantes deverão desenvolver?"
                      registerProps={register("habilidades")}
                    />

                    <CampoTexto
                      titulo="Objetivos de aprendizagem"
                      placeholder="O que os estudantes deverão aprender ao final?"
                      registerProps={register("objetivos")}
                    />
                  </div>
                </div>
              </SecaoFormulario>

              {/* Etapa 2 */}
              <SecaoFormulario
                numero="02"
                icone={CalendarDays}
                titulo="Planos e estratégias"
                descricao="Adicione os conteúdos e as datas previstas para cada aula."
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Cronograma de aulas
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {fields.length} {fields.length === 1 ? "aula adicionada" : "aulas adicionadas"}
                      {quantidadeAulasInformada
                        ? ` · ${quantidadeAulasInformada} previstas`
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      append({
                        data: "",
                        encaminhamentoPedagogico: "",
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B3B66] active:scale-[0.98]"
                  >
                    <Plus size={18} />
                    Adicionar aula
                  </button>
                </div>

                {fields.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <CalendarDays size={23} />
                    </div>

                    <p className="font-semibold text-slate-700">
                      Seu cronograma está vazio
                    </p>

                    <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                      Adicione uma aula para registrar sua data e o conteúdo que será trabalhado.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        append({
                          data: "",
                          encaminhamentoPedagogico: "",
                        })
                      }
                      className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                      <Plus size={17} />
                      Adicionar primeira aula
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-[#0F4C81]">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-800">
                                Aula {index + 1}
                              </h4>
                              <p className="text-xs text-slate-500">
                                Data e conteúdo
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(index)}
                            aria-label={`Remover aula ${index + 1}`}
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Remover</span>
                          </button>
                        </div>

                        <div className="space-y-5 p-4 sm:p-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">
                              Data da aula <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="date"
                              {...register(`aulas.${index}.data`, {
                                required: true,
                              })}
                            />
                          </div>

                          <CampoTexto
                            titulo="Nome do conteúdo"
                            placeholder="Ex.: Química ecológica, funções do 1º grau..."
                            obrigatorio
                            registerProps={register(
                              `aulas.${index}.encaminhamentoPedagogico`,
                              { required: true }
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SecaoFormulario>

              {/* Etapa 3 */}
              <SecaoFormulario
                numero="03"
                icone={ClipboardCheck}
                titulo="Processo avaliativo"
                descricao="Registre como a aprendizagem será acompanhada e avaliada."
              >
                <CampoTexto
                  titulo="Provas e trabalhos"
                  placeholder="Descreva as provas, trabalhos e outras atividades avaliativas..."
                  obrigatorio
                  registerProps={register("avaliacoes", {
                    required: true,
                  })}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Tipo de avaliação <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("tipoAvaliacao", { required: true })}
                    placeholder="Ex.: Formativa e somativa"
                  />
                </div>

                <CampoTexto
                  titulo="Critérios de avaliação"
                  placeholder="Quais critérios serão utilizados para avaliar os estudantes?"
                  obrigatorio
                  registerProps={register("criterios", {
                    required: true,
                  })}
                />
              </SecaoFormulario>

              {/* Etapa 4 */}
              <SecaoFormulario
                numero="04"
                icone={Package}
                titulo="Materiais e recursos"
                descricao="Liste os materiais necessários para executar o planejamento."
              >
                <CampoTexto
                  titulo="Materiais necessários"
                  placeholder="Ex.: Livro didático, quadro, projetor, folhas de atividade..."
                  obrigatorio
                  registerProps={register("materiais", {
                    required: true,
                  })}
                />
              </SecaoFormulario>

              {/* Ações finais */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Pronto para salvar?
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      Revise os dados antes de registrar o planejamento.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      disabled={salvando}
                      onClick={() => navigate("/PlanejarPrincipal")}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={salvando}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/10 transition hover:bg-[#0B3B66] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {salvando ? (
                        <>
                          <LoaderCircle size={18} className="animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Salvar planejamento
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-slate-400">
                Edu+.IA · Apoio inteligente para o planejamento docente
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default CriarManualmente;
