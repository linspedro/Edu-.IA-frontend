
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Target,
  Lightbulb,
  Package,
  Sparkles,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Layers3,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import BtnAzul from "../componentes/bntAzul";
import Input from "../componentes/input";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import { useAuth } from "../contexts/AuthContext";
import AulaApi from "../api/modelos/Aula";

function CampoSecao({ icone: Icone, titulo, descricao, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icone size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            {titulo}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {descricao}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function CampoTexto({
  titulo,
  descricao,
  placeholder,
  registerProps,
  erro,
  linhas = 4,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {titulo}
      </label>

      {descricao && (
        <p className="-mt-1 text-xs leading-relaxed text-slate-500">
          {descricao}
        </p>
      )}

      <textarea
        {...registerProps}
        rows={linhas}
        placeholder={placeholder}
        className={`w-full resize-y rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
          erro
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      />

      {erro && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={14} />
          {erro}
        </p>
      )}
    </div>
  );
}

function GerarComIA() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      disciplina: "",
      serie: "",
      tema: "",
      duracao: 50,
      objetivos: "",
      habilidades: "",
      observacoes: "",
      metodologia: "",
      quantidadeAulas: 1,
      recursos: "",
    },
  });

  const onSubmit = async (data) => {
    if (gerando) return;

    setErro("");
    setSucesso("");

    if (!usuario?.id) {
      setErro("Não foi possível identificar seu usuário. Entre novamente.");
      return;
    }

    setGerando(true);

    try {
      const resposta = await AulaApi.gerarComIA({
        id_usuario: usuario.id,
        disciplina: data.disciplina.trim(),
        turma: data.serie.trim(),
        tema: data.tema.trim(),
        duracao: Number(data.duracao),
        objetivos: data.objetivos,
        habilidades: data.habilidades,
        metodologia: data.metodologia,
        quantidadeAulas: Number(data.quantidadeAulas),
        materiais: data.recursos,
        observacoes: data.observacoes,
      });

      if (resposta?.status === 200 || resposta?.status === 201) {
        setSucesso("Plano gerado! Redirecionando para a biblioteca...");

        setTimeout(() => {
          navigate("/BibliotecaPrincipal");
        }, 800);
      } else {
        setErro(
          resposta?.data?.erro ||
            resposta?.data?.mensagem ||
            "Não foi possível gerar a aula. Tente novamente."
        );
      }
    } catch (error) {
      setErro(
        error?.response?.data?.erro ||
          "Não foi possível conectar ao servidor. Verifique se a API está funcionando."
      );
    } finally {
      setGerando(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F4F7FB]">
      <MenuAzul Text="Gerar com IA" />

      <div className="flex w-full flex-col md:flex-row">
        <MenuLateral />

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          {/* VOLTAR */}
          <button
            type="button"
            onClick={() => navigate("/PlanejarPrincipal")}
            disabled={gerando}
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-blue-700 disabled:opacity-50"
          >
            <ArrowLeft size={18} />
            Voltar ao planejamento
          </button>

          {/* CABEÇALHO */}
          <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4C81] via-[#1769AA] to-[#2499F9] p-6 text-white shadow-lg sm:p-9">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative z-10 max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide">
                <Sparkles size={15} />
                PLANEJAMENTO INTELIGENTE
              </span>

              <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
                Planeje sua aula com inteligência artificial
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-50 sm:text-base">
                Informe os detalhes da sua aula e deixe a IA ajudar você a
                organizar objetivos, habilidades, estratégias e recursos
                pedagógicos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium sm:text-sm">
                <span className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <CheckCircle2 size={16} />
                  Personalizado
                </span>
                <span className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <BookOpen size={16} />
                  Apoio pedagógico
                </span>
              </div>
            </div>
          </header>

          {/* FORMULÁRIO */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex max-w-5xl flex-col gap-6"
          >
            {/* INFORMAÇÕES PRINCIPAIS */}
            <CampoSecao
              icone={GraduationCap}
              titulo="Informações principais"
              descricao="Comece definindo o contexto da aula que deseja planejar."
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Disciplina *
                  </label>
                  <Input
                    placeholder="Ex.: História"
                    {...register("disciplina", {
                      required: "Informe a disciplina.",
                    })}
                  />
                  {errors.disciplina && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.disciplina.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Série ou turma *
                  </label>
                  <Input
                    placeholder="Ex.: 2º ano do Ensino Médio"
                    {...register("serie", {
                      required: "Informe a série ou turma.",
                    })}
                  />
                  {errors.serie && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.serie.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Tema da aula *
                  </label>
                  <Input
                    placeholder="Ex.: Segunda Guerra Mundial"
                    {...register("tema", {
                      required: "Informe o tema da aula.",
                    })}
                  />
                  {errors.tema && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.tema.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock3 size={16} className="text-blue-600" />
                    Duração de cada aula (minutos) *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Ex.: 50"
                    {...register("duracao", {
                      required: "Informe a duração.",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "A duração deve ser maior que zero.",
                      },
                    })}
                  />
                  {errors.duracao && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.duracao.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Layers3 size={16} className="text-blue-600" />
                    Quantidade de aulas *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="Ex.: 1"
                    {...register("quantidadeAulas", {
                      required: "Informe a quantidade de aulas.",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Informe pelo menos uma aula.",
                      },
                      max: {
                        value: 20,
                        message: "O limite é de 20 aulas.",
                      },
                    })}
                  />
                  {errors.quantidadeAulas && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.quantidadeAulas.message}
                    </p>
                  )}
                </div>
              </div>
            </CampoSecao>

            {/* OBJETIVOS E HABILIDADES */}
            <CampoSecao
              icone={Target}
              titulo="Objetivos e habilidades"
              descricao="Ajude a IA a entender o que os estudantes deverão aprender e desenvolver."
            >
              <div className="flex flex-col gap-5">
                <CampoTexto
                  titulo="Objetivos de aprendizagem"
                  descricao="O que você espera que os estudantes aprendam ao final da aula?"
                  placeholder="Ex.: Compreender as principais causas e consequências da Segunda Guerra Mundial..."
                  registerProps={register("objetivos")}
                  linhas={4}
                />

                <CampoTexto
                  titulo="Habilidades a desenvolver"
                  descricao="Você pode informar habilidades curriculares ou competências específicas."
                  placeholder="Ex.: Analisar fontes históricas, comparar acontecimentos e argumentar..."
                  registerProps={register("habilidades")}
                  linhas={4}
                />

                <CampoTexto
                  titulo="Observações para a IA"
                  descricao="Inclua necessidades específicas da turma, adaptações ou orientações."
                  placeholder="Ex.: Turma com diferentes níveis de aprendizagem. Usar linguagem simples e exemplos práticos..."
                  registerProps={register("observacoes")}
                  linhas={3}
                />
              </div>
            </CampoSecao>

            {/* PREFERÊNCIAS */}
            <CampoSecao
              icone={Lightbulb}
              titulo="Preferências pedagógicas"
              descricao="Personalize a abordagem que a IA deverá considerar na elaboração do plano."
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Metodologia desejada
                </label>
                <Input
                  placeholder="Ex.: Aula expositiva dialogada, debate, sala invertida..."
                  {...register("metodologia")}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Se não tiver uma metodologia definida, deixe em branco para a
                  IA sugerir uma adequada ao tema.
                </p>
              </div>
            </CampoSecao>

            {/* RECURSOS */}
            <CampoSecao
              icone={Package}
              titulo="Materiais e recursos"
              descricao="Informe os materiais disponíveis ou os recursos que gostaria de utilizar."
            >
              <CampoTexto
                titulo="Materiais desejados"
                descricao="Considere os recursos que sua escola e sua turma têm disponíveis."
                placeholder="Ex.: Quadro, projetor, livro didático, imagens, vídeos ou materiais impressos..."
                registerProps={register("recursos")}
                linhas={4}
              />
            </CampoSecao>

            {/* MENSAGENS */}
            {erro && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 shrink-0" size={20} />
                <p>{erro}</p>
              </div>
            )}

            {sucesso && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                <p>{sucesso}</p>
              </div>
            )}

            {/* AÇÃO FINAL */}
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold text-slate-800">
                    Tudo pronto para começar?
                  </h2>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-slate-600">
                    Revise os dados e gere um plano personalizado para sua
                    prática pedagógica.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={gerando}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0B3A63] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {gerando ? (
                    <>
                      <LoaderCircle className="animate-spin" size={19} />
                      Gerando plano...
                    </>
                  ) : (
                    <>
                      <Sparkles size={19} />
                      Gerar plano com IA
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 border-t border-blue-100 pt-3 text-xs leading-relaxed text-slate-500">
                A inteligência artificial pode cometer erros. Revise o plano
                gerado antes de utilizá-lo em sala de aula.
              </p>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default GerarComIA;