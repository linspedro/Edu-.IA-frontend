
import { useState } from "react";
import { Sparkles, BookOpen, Clock, Target, FileText, Lightbulb, CheckCircle2, ArrowLeft } from "lucide-react";
import BtnAzul from "../componentes/bntAzul";
import Input from "../componentes/input";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AtividadeApi from "../api/modelos/Atividade";

function GerarAtividade() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [opcoes, setOpcoes] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState(null);
  const [gerando, setGerando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (gerando || salvando) return;

    if (!usuario?.id) {
      setErro("Não foi possível identificar o usuário logado.");
      return;
    }

    setErro("");
    setSucesso("");
    setOpcoes([]);
    setOpcaoSelecionada(null);
    setDadosFormulario(data);
    setGerando(true);

    try {
      const resposta = await AtividadeApi.gerarComIA({
        id_usuario: usuario.id,
        titulo: data.titulo,
        disciplina: data.disciplina,
        turma: data.turma,
        duracao: data.duracao,
        objetivo: data.objetivo,
        descricao: data.descricao,
        observacoes: data.observacoes,
      });

      if (
        resposta.status >= 200 &&
        resposta.status < 300 &&
        Array.isArray(resposta.data?.opcoes) &&
        resposta.data.opcoes.length === 3
      ) {
        setOpcoes(resposta.data.opcoes);
      } else {
        setErro(
          resposta.data?.erro ||
            "A IA não retornou as três opções esperadas."
        );
      }
    } catch (error) {
      setErro(
        error.response?.data?.erro ||
          "Não foi possível conectar ao servidor."
      );
    } finally {
      setGerando(false);
    }
  };

  const salvarEscolhida = async () => {
    if (
      opcaoSelecionada === null ||
      !dadosFormulario ||
      !usuario?.id ||
      salvando
    ) {
      return;
    }

    const escolhida = opcoes[opcaoSelecionada];

    setErro("");
    setSucesso("");
    setSalvando(true);

    try {
      const resposta = await AtividadeApi.criar({
        id_usuario: usuario.id,
        titulo: dadosFormulario.titulo,
        materia: dadosFormulario.disciplina,
        turma: dadosFormulario.turma,
        trimestre: null,
        titulo_da_atividade: escolhida.titulo_da_atividade,
        objetivo: escolhida.objetivo,
        descricao: escolhida.descricao,
        duracao: escolhida.duracao,
        observacoes: escolhida.observacoes,
      });

      if (resposta.status >= 200 && resposta.status < 300) {
        const idAtividade =
          resposta.data?.id_atividade ??
          resposta.data?.atividade?.id_atividade;

        if (idAtividade) {
          navigate(`/VisualizarAtividade/${idAtividade}`);
          return;
        }

        setSucesso("Atividade salva com sucesso!");
        setOpcoes([]);
        setOpcaoSelecionada(null);
      } else {
        setErro(
          resposta.data?.erro || "Não foi possível salvar a atividade."
        );
      }
    } catch (error) {
      setErro(
        error.response?.data?.erro ||
          "Não foi possível salvar a atividade escolhida."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F3F7FC]">
      <MenuAzul Text="Gerar Atividades" />

      <div className="flex min-h-screen flex-col md:flex-row">
        <MenuLateral />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          {/* CABEÇALHO */}
          <div className="mx-auto max-w-6xl">
            <button
              type="button"
              onClick={() => navigate("/Principal")}
              className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-700"
            >
              <ArrowLeft size={18} />
              Voltar ao painel
            </button>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#063D78] via-[#075DA8] to-[#2499F9] p-6 text-white shadow-lg shadow-blue-900/10 sm:p-9">
              <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-cyan-300/10 blur-2xl" />

              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-blue-50">
                    <Sparkles size={16} className="text-yellow-300" />
                    Assistente pedagógico com IA
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Crie atividades incríveis
                  </h1>

                  <p className="mt-3 max-w-xl leading-7 text-blue-100">
                    Informe os detalhes da sua aula e receba três sugestões
                    de atividades para escolher a que melhor combina com sua
                    turma.
                  </p>
                </div>

                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:flex">
                  <BookOpen size={42} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              {/* INFORMAÇÕES PRINCIPAIS */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <BookOpen size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Informações principais
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Identifique a atividade e o público que irá realizá-la.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Título da atividade <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Ex.: Desafio da leitura"
                      {...register("titulo", {
                        required: "Informe o título da atividade.",
                      })}
                    />
                    {errors.titulo && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.titulo.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Disciplina <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Ex.: Língua Portuguesa"
                      {...register("disciplina", {
                        required: "Informe a disciplina.",
                      })}
                    />
                    {errors.disciplina && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.disciplina.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Turma ou público-alvo <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Ex.: 6º ano do Ensino Fundamental"
                      {...register("turma", {
                        required: "Informe a turma.",
                      })}
                    />
                    {errors.turma && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.turma.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Duração estimada
                    </label>
                    <Input
                      placeholder="Ex.: 50 minutos"
                      {...register("duracao")}
                    />
                  </div>
                </div>
              </section>

              {/* CONFIGURAÇÃO */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Target size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Objetivo e orientações
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Personalize as sugestões que a inteligência artificial
                      irá preparar.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Objetivo da atividade
                    </label>
                    <Input
                      placeholder="O que os alunos deverão aprender ou desenvolver?"
                      {...register("objetivo")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Descrição ou contexto
                    </label>
                    <textarea
                      {...register("descricao")}
                      placeholder="Descreva o conteúdo trabalhado, a situação da turma ou a proposta inicial..."
                      className="min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Orientações adicionais para a IA
                    </label>
                    <textarea
                      {...register("observacoes")}
                      placeholder="Ex.: atividade em grupo, poucos materiais, proposta inclusiva ou formato de avaliação..."
                      className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </section>

              {/* ERROS E AÇÕES */}
              {erro && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {erro}
                </div>
              )}

              {sucesso && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {sucesso}
                </div>
              )}

              <div className="flex flex-col items-center rounded-2xl border border-blue-100 bg-blue-50/70 p-6 text-center sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                  <Sparkles size={28} />
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-800">
                  Vamos criar suas atividades?
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                  A IA irá preparar três propostas diferentes. Você poderá
                  comparar as opções e salvar somente a escolhida.
                </p>

                <div className="mt-6 w-full sm:w-auto">
                  <BtnAzul
                    type="submit"
                    children={
                      <span className="inline-flex items-center justify-center gap-2">
                        <Sparkles size={18} />
                        {gerando ? "Gerando sugestões..." : "Gerar 3 opções com IA"}
                      </span>
                    }
                    tamanho="w-full sm:w-80"
                  />
                </div>

                {gerando && (
                  <p className="mt-4 animate-pulse text-sm text-blue-700">
                    Preparando suas sugestões. Aguarde um momento...
                  </p>
                )}
              </div>
            </form>

            {/* RESULTADOS */}
            {opcoes.length === 3 && (
              <section className="mt-12 pb-10">
                <div className="mb-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                    <CheckCircle2 size={16} />
                    Sugestões geradas
                  </span>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Escolha sua atividade
                  </h2>

                  <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                    Compare as propostas abaixo. Ao escolher uma opção,
                    você poderá salvá-la no seu espaço de atividades.
                  </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {opcoes.map((opcao, index) => {
                    const selecionada = opcaoSelecionada === index;

                    return (
                      <article
                        key={index}
                        className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white transition duration-200 ${
                          selecionada
                            ? "border-blue-500 shadow-lg shadow-blue-900/10 ring-2 ring-blue-100"
                            : "border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg"
                        }`}
                      >
                        <div
                          className={`h-1.5 ${
                            selecionada
                              ? "bg-blue-600"
                              : "bg-gradient-to-r from-blue-500 to-cyan-400"
                          }`}
                        />

                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-800">
                              Opção {index + 1}
                            </span>

                            {selecionada && (
                              <CheckCircle2
                                size={22}
                                className="text-blue-600"
                              />
                            )}
                          </div>

                          <h3 className="text-xl font-bold leading-snug text-slate-900">
                            {opcao.titulo_da_atividade}
                          </h3>

                          <div className="mt-5 flex-1 space-y-5">
                            <div>
                              <h4 className="mb-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                                <Target size={16} className="text-blue-600" />
                                Objetivo
                              </h4>
                              <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                {opcao.objetivo || "Não informado."}
                              </p>
                            </div>

                            <div>
                              <h4 className="mb-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                                <FileText size={16} className="text-blue-600" />
                                Como realizar
                              </h4>
                              <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                {opcao.descricao || "Não informado."}
                              </p>
                            </div>

                            <div>
                              <h4 className="mb-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                                <Clock size={16} className="text-blue-600" />
                                Duração
                              </h4>
                              <p className="text-sm leading-6 text-slate-600">
                                {opcao.duracao || "A definir"}
                              </p>
                            </div>

                            {opcao.observacoes && (
                              <div>
                                <h4 className="mb-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                                  <Lightbulb size={16} className="text-blue-600" />
                                  Observações
                                </h4>
                                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                  {opcao.observacoes}
                                </p>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={salvando}
                            onClick={() => {
                              setOpcaoSelecionada(index);
                              setErro("");
                              setSucesso("");
                            }}
                            className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              selecionada
                                ? "bg-blue-700 text-white shadow-md shadow-blue-900/10"
                                : "border border-blue-200 bg-white text-blue-800 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            {selecionada
                              ? "✓ Atividade selecionada"
                              : "Escolher esta atividade"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Pronto para continuar?
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {opcaoSelecionada !== null
                          ? `Você selecionou a opção ${opcaoSelecionada + 1}. Somente ela será salva.`
                          : "Selecione uma das três opções para continuar."}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={opcaoSelecionada === null || salvando}
                      onClick={salvarEscolhida}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                    >
                      <CheckCircle2 size={18} />
                      {salvando ? "Salvando atividade..." : "Salvar atividade escolhida"}
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default GerarAtividade;
